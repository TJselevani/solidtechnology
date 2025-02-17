import React from "react";
import { imageUrl } from "@/lib/imageUrl";
import { getAllOrders } from "@/sanity/lib/queries/orders/getAllOrders";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { formatPriceFromInt } from "@/utils/formatPrice";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ShoppingBag, Clock, CheckCircle } from "lucide-react";
import PaymentDetails from "@/components/payment/PaymentDetails";

const Orders = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
    return null;
  }

  const orders = await getAllOrders(userId);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-emerald-100 text-emerald-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">
                You have not placed any orders yet.
              </p>
              <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Start Shopping
              </button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.orderNumber} className="overflow-hidden">
                <CardHeader className="bg-gray-50 border-b border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Order Number</p>
                      <p className="font-mono text-sm text-primary break-all">
                        {order.orderNumber}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium">
                          {order.orderDate
                            ? new Date(order.orderDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="md:text-right">
                      <p className="text-sm text-gray-500">Status</p>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status!)}`}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {order.status}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Payment Details Component */}
                  <PaymentDetails order={order} />

                  {order.amountDiscount! > 0 && (
                    <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-100">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                        <div>
                          <p className="text-red-600 font-medium">
                            Discount Applied
                          </p>
                          <p className="text-sm text-gray-600">
                            Original: ksh{" "}
                            {formatPriceFromInt(
                              order.totalPrice! + order.amountDiscount!
                            )}
                          </p>
                        </div>
                        <p className="text-red-600 font-bold text-lg">
                          - ksh {formatPriceFromInt(order.amountDiscount!)}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {order.products?.map((product) => (
                      <div
                        key={product.product?._id}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {product.product?.image && (
                          <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-white">
                            <Image
                              src={imageUrl(product.product.image).url()}
                              alt={product.product.name || ""}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {product.product?.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {product.quantity ?? "N/A"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">
                            ksh{" "}
                            {product.product?.price && product.quantity
                              ? formatPriceFromInt(
                                  product.product.price * product.quantity
                                )
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-medium text-gray-900">
                        Total Amount
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        ksh {formatPriceFromInt(order.totalPrice!)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
