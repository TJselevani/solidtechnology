"use client";
import dynamic from "next/dynamic";
import {
  createStripeCheckoutSession,
  Metadata,
} from "@/actions/createStripeCheckoutSession";
import ManageBasketButton from "@/components/basket/ManageBasket";
import Loader from "@/components/common/loader";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store/store";
import { formatPriceFromString } from "@/utils/formatPrice";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, CreditCard, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import WhatsAppChekoutButton from "@/components/whatsapp/WhatsappCheckoutButton";

const MpesaPayment = dynamic(
  () => import("@/components/payment/MpesaPayment"),
  {
    ssr: false, // 🚀 Prevents the component from loading on the server
  }
);

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMpesa, setShowMpesa] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Loader />;

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-[80vh]">
        <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Your basket is empty
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Start adding some items to your basket
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleCardCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };

      const checkoutUrl = await createStripeCheckoutSession(
        groupedItems,
        metadata
      );

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount = useBasketStore.getState().getTotalPrice();
  const totalItems = groupedItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4 max-w-6xl min-h-screen">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <ShoppingBag className="w-8 h-8" />
        Your Basket
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow space-y-4">
          {groupedItems?.map((item) => (
            <Card
              key={item.product._id}
              className="hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row  items-center justify-between cursor-pointer gap-4">
                  <div className="flex flex-row items-center justify-around gap-6">
                    <Link href={`/product/${item.product.slug?.current}`}>
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                        {item.product.image && (
                          <Image
                            src={imageUrl(item.product.image).url()}
                            alt={item.product.name ?? "Product"}
                            className="object-contain"
                            fill
                          />
                        )}
                      </div>
                    </Link>

                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold mb-1">
                        {item.product.name}
                      </h2>
                      <p className="text-gray-600">
                        @ ksh{" "}
                        {formatPriceFromString(
                          (item.product.price ?? 0).toFixed(2)
                        )}
                      </p>

                      <p className="text-gray-600">
                        ksh{" "}
                        {formatPriceFromString(
                          ((item.product.price ?? 0) * item.quantity).toFixed(2)
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ManageBasketButton
                      product={item.product}
                      disabled={false}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:w-96">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({totalItems})</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between text-2xl font-bold pt-4 border-t">
                  <span>Total:</span>
                  <span className="text-primary">
                    ksh {formatPriceFromString(totalAmount.toFixed(2))}
                  </span>
                </div>

                {isSignedIn ? (
                  <div className="space-y-3">
                    <button
                      onClick={handleCardCheckout}
                      disabled={isLoading}
                      className="w-full bg-primary text-white px-4 py-3 rounded-lg
                               hover:bg-primary/90 disabled:bg-gray-400 
                               transition-colors duration-200
                               flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      {isLoading ? "Processing..." : "Pay with Card"}
                    </button>

                    <button
                      onClick={() => setShowMpesa(true)}
                      className="w-full bg-green-600 text-white px-4 py-3 rounded-lg
                               hover:bg-green-700 transition-colors duration-200
                               flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Pay with M-Pesa
                    </button>
                    <WhatsAppChekoutButton products={groupedItems} />
                  </div>
                ) : (
                  <SignInButton mode="modal">
                    <button
                      className="w-full bg-primary text-white px-4 py-3 rounded-lg
                                     hover:bg-primary/90 transition-colors duration-200"
                    >
                      Sign in to Checkout
                    </button>
                  </SignInButton>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showMpesa && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowMpesa(false)} // Close when clicking outside
        >
          <div
            className="bg-white rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <MpesaPayment
              amount={totalAmount}
              customerPhone={user?.phoneNumbers[0]?.phoneNumber ?? ""}
              orderNumber={crypto.randomUUID()}
              clerkUserId={user?.id ?? ""}
              customerName={user?.username ?? ""}
              customerEmail={user?.primaryEmailAddress?.emailAddress ?? ""}
              products={groupedItems}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default BasketPage;
