import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiCheckCircle, FiChevronRight, FiCreditCard, FiDollarSign, FiShoppingBag, FiTruck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { cart, subtotal, discountAmount, shipping, tax, grandTotal, clearCart } = useCart();
  const { user, addAddress } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-xl font-bold">Your Cart is Empty</h2>
        <p className="text-xs text-gray-400">Add products to your shopping bag before visiting checkout.</p>
        <Link to="/shop" className="px-6 py-3 bg-accent text-white rounded-xl text-xs font-bold inline-block">
          Go Shopping
        </Link>
      </div>
    );
  }

  // Yup Validation Schema for Shipping Address
  const CheckoutSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    street: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    zip: Yup.string().matches(/^[0-9]{5}$/, 'Must be exactly 5 digits').required('Required'),
    phone: Yup.string().required('Required'),
    // Conditional card validation
    cardNumber: Yup.string().when('paymentMethod', {
      is: () => paymentMethod === 'card',
      then: () => Yup.string().matches(/^[0-9]{16}$/, 'Must be exactly 16 digits').required('Card number is required'),
      otherwise: () => Yup.string().notRequired(),
    }),
    cardName: Yup.string().when('paymentMethod', {
      is: () => paymentMethod === 'card',
      then: () => Yup.string().required('Cardholder name is required'),
      otherwise: () => Yup.string().notRequired(),
    }),
    cardExpiry: Yup.string().when('paymentMethod', {
      is: () => paymentMethod === 'card',
      then: () => Yup.string().matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Format MM/YY').required('Required'),
      otherwise: () => Yup.string().notRequired(),
    }),
    cardCvv: Yup.string().when('paymentMethod', {
      is: () => paymentMethod === 'card',
      then: () => Yup.string().matches(/^[0-9]{3}$/, 'Must be 3 digits').required('Required'),
      otherwise: () => Yup.string().notRequired(),
    })
  });

  const defaultAddress = user?.addresses?.find(a => a.isDefault) || {};

  const initialValues = {
    email: user?.email || '',
    firstName: user?.username?.split(' ')[0] || '',
    lastName: user?.username?.split(' ')[1] || '',
    street: defaultAddress.street || '',
    city: defaultAddress.city || '',
    state: defaultAddress.state || '',
    zip: defaultAddress.zip || '',
    phone: defaultAddress.phone || '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  };

  const handlePlaceOrder = (values) => {
    // Generate mock order ID
    const orderId = `AURA-ORDER-${Math.floor(100000 + Math.random() * 900000)}`;
    setCreatedOrderId(orderId);

    // Save Address if logged in and doesn't exist
    if (user && !user.addresses?.some(a => a.street === values.street)) {
      addAddress({
        type: "Billing",
        name: `${values.firstName} ${values.lastName}`,
        street: values.street,
        city: values.city,
        state: values.state,
        zip: values.zip,
        country: "USA",
        phone: values.phone,
        isDefault: false
      });
    }

    // Save Order to Local Storage
    const existingOrders = JSON.parse(localStorage.getItem('aura_orders') || '[]');
    const newOrder = {
      orderId,
      date: new Date().toISOString().split('T')[0],
      items: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        image: item.product.images[0],
        price: item.product.price,
        quantity: item.quantity,
        color: item.selectedColor,
        size: item.selectedSize
      })),
      financials: { subtotal, discountAmount, shipping, tax, grandTotal },
      shippingAddress: {
        name: `${values.firstName} ${values.lastName}`,
        street: values.street,
        city: values.city,
        state: values.state,
        zip: values.zip,
        phone: values.phone
      },
      paymentMethod,
      status: 'Placed',
      userId: user?.id || 'guest'
    };

    localStorage.setItem('aura_orders', JSON.stringify([newOrder, ...existingOrders]));

    // Place Order State
    setOrderPlaced(true);
    clearCart();
    toast.success('Order placed successfully!', { icon: '🎉' });
  };

  if (orderPlaced) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-6">
        <div className="flex justify-center text-success">
          <FiCheckCircle className="h-20 w-20 animate-pulse stroke-[1.5]" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-primary dark:text-primary-dark">Order Confirmed!</h2>
          <p className="text-xs text-gray-550 dark:text-gray-400">
            Thank you for shopping at AURA. Your order has been placed and is currently being processed.
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-2xl text-left space-y-2.5 text-xs">
          <div className="flex justify-between font-semibold">
            <span className="text-gray-400">Order ID:</span>
            <span className="text-primary dark:text-white">{createdOrderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Estimated Delivery:</span>
            <span className="text-primary dark:text-white font-medium">3-5 business days</span>
          </div>
          <div className="flex justify-between border-t border-gray-50 dark:border-gray-800 pt-2.5 font-bold">
            <span>Total Paid:</span>
            <span>${grandTotal}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 pt-4">
          <button
            onClick={() => navigate(`/track-order/${createdOrderId}`)}
            className="w-full py-3 bg-accent text-white rounded-xl text-xs font-bold shadow-md hover:bg-accent-dark transition-colors"
          >
            Track Your Order
          </button>
          <Link
            to="/"
            className="text-xs text-gray-400 hover:text-accent font-semibold"
          >
            Go Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight">Checkout</h1>
        <p className="text-xs text-gray-550 mt-1">Complete your shipping and payment configurations to place your order.</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={CheckoutSchema}
        onSubmit={handlePlaceOrder}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Input details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address Card */}
              <div className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-premium space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center">
                  <FiTruck className="mr-2 h-4.5 w-4.5" /> Shipping Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">First Name</label>
                    <Field 
                      name="firstName" 
                      className={`w-full bg-gray-55 dark:bg-gray-800 border rounded-xl px-3 py-2.5 text-xs focus:outline-none ${errors.firstName && touched.firstName ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                    />
                    <ErrorMessage name="firstName" component="span" className="text-[10px] text-danger" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Last Name</label>
                    <Field 
                      name="lastName" 
                      className={`w-full bg-gray-55 dark:bg-gray-800 border rounded-xl px-3 py-2.5 text-xs focus:outline-none ${errors.lastName && touched.lastName ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                    />
                    <ErrorMessage name="lastName" component="span" className="text-[10px] text-danger" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Delivery Address</label>
                  <Field 
                    name="street" 
                    placeholder="Street Address, Apartment, Suite"
                    className={`w-full bg-gray-55 dark:bg-gray-800 border rounded-xl px-3 py-2.5 text-xs focus:outline-none ${errors.street && touched.street ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                  />
                  <ErrorMessage name="street" component="span" className="text-[10px] text-danger" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">City</label>
                    <Field 
                      name="city" 
                      className={`w-full bg-gray-55 dark:bg-gray-800 border rounded-xl px-3 py-2.5 text-xs focus:outline-none ${errors.city && touched.city ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                    />
                    <ErrorMessage name="city" component="span" className="text-[10px] text-danger" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">State</label>
                    <Field 
                      name="state" 
                      className={`w-full bg-gray-55 dark:bg-gray-800 border rounded-xl px-3 py-2.5 text-xs focus:outline-none ${errors.state && touched.state ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                    />
                    <ErrorMessage name="state" component="span" className="text-[10px] text-danger" />
                  </div>
                  <div className="space-y-1 col-span-2 sm:col-span-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Zip Code</label>
                    <Field 
                      name="zip" 
                      placeholder="90210"
                      className={`w-full bg-gray-55 dark:bg-gray-800 border rounded-xl px-3 py-2.5 text-xs focus:outline-none ${errors.zip && touched.zip ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                    />
                    <ErrorMessage name="zip" component="span" className="text-[10px] text-danger" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Email Address</label>
                    <Field 
                      name="email" 
                      type="email"
                      className={`w-full bg-gray-55 dark:bg-gray-800 border rounded-xl px-3 py-2.5 text-xs focus:outline-none ${errors.email && touched.email ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                    />
                    <ErrorMessage name="email" component="span" className="text-[10px] text-danger" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Phone Number</label>
                    <Field 
                      name="phone" 
                      placeholder="+1 (555) 000-0000"
                      className={`w-full bg-gray-55 dark:bg-gray-800 border rounded-xl px-3 py-2.5 text-xs focus:outline-none ${errors.phone && touched.phone ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                    />
                    <ErrorMessage name="phone" component="span" className="text-[10px] text-danger" />
                  </div>
                </div>
              </div>

              {/* Payment Methods Card */}
              <div className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-premium space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center">
                  <FiCreditCard className="mr-2 h-4.5 w-4.5" /> Payment Method
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border text-xs font-semibold flex flex-col items-center justify-center space-y-2 transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-accent bg-accent/5 text-accent dark:text-accent-light' 
                        : 'border-gray-200 dark:border-gray-750 hover:border-gray-300'
                    }`}
                  >
                    <FiCreditCard className="h-5 w-5" />
                    <span>Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-2xl border text-xs font-semibold flex flex-col items-center justify-center space-y-2 transition-all ${
                      paymentMethod === 'upi' 
                        ? 'border-accent bg-accent/5 text-accent dark:text-accent-light' 
                        : 'border-gray-200 dark:border-gray-750 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-extrabold tracking-widest text-[10px] border border-current px-1.5 py-0.5 rounded">UPI</span>
                    <span>UPI / QR</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border text-xs font-semibold flex flex-col items-center justify-center space-y-2 transition-all ${
                      paymentMethod === 'cod' 
                        ? 'border-accent bg-accent/5 text-accent dark:text-accent-light' 
                        : 'border-gray-200 dark:border-gray-750 hover:border-gray-300'
                    }`}
                  >
                    <FiDollarSign className="h-5 w-5" />
                    <span>COD</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-4 border-t border-gray-50 dark:border-gray-800">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Cardholder Name</label>
                      <Field 
                        name="cardName" 
                        placeholder="John Doe"
                        className={`w-full bg-gray-55 dark:bg-gray-800 border rounded-xl px-3 py-2.5 text-xs focus:outline-none ${errors.cardName && touched.cardName ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                      />
                      <ErrorMessage name="cardName" component="span" className="text-[10px] text-danger" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Card Number</label>
                      <Field 
                        name="cardNumber" 
                        placeholder="4242424242424242"
                        className={`w-full bg-gray-55 dark:bg-gray-800 border rounded-xl px-3 py-2.5 text-xs focus:outline-none ${errors.cardNumber && touched.cardNumber ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                        maxLength={16}
                      />
                      <ErrorMessage name="cardNumber" component="span" className="text-[10px] text-danger" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Expiry Date</label>
                        <Field 
                          name="cardExpiry" 
                          placeholder="MM/YY"
                          className={`w-full bg-gray-55 dark:bg-gray-800 border rounded-xl px-3 py-2.5 text-xs focus:outline-none ${errors.cardExpiry && touched.cardExpiry ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                        />
                        <ErrorMessage name="cardExpiry" component="span" className="text-[10px] text-danger" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">CVV</label>
                        <Field 
                          name="cardCvv" 
                          type="password"
                          placeholder="***"
                          className={`w-full bg-gray-55 dark:bg-gray-800 border rounded-xl px-3 py-2.5 text-xs focus:outline-none ${errors.cardCvv && touched.cardCvv ? 'border-danger' : 'border-gray-200 dark:border-gray-700'}`}
                          maxLength={3}
                        />
                        <ErrorMessage name="cardCvv" component="span" className="text-[10px] text-danger" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="pt-4 border-t border-gray-50 dark:border-gray-800 text-center space-y-2 py-4">
                    <p className="text-xs text-gray-550">Scan QR Code or enter VPA ID at checkout confirmation.</p>
                    <div className="inline-block p-4 bg-gray-100 rounded-2xl">
                      {/* Fake QR representation */}
                      <div className="w-24 h-24 bg-gray-300 border-2 border-gray-400 flex items-center justify-center font-bold text-gray-500 text-[10px]">AURA QR</div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="pt-4 border-t border-gray-50 dark:border-gray-800 py-4">
                    <p className="text-xs text-gray-550 leading-relaxed">
                      Pay with cash upon package arrival. A standard delivery surcharge of $5 may apply depending on carrier policies.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order details & totals */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-card-dark border border-gray-150 dark:border-gray-800 rounded-3xl p-6 shadow-premium space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center">
                  <FiShoppingBag className="mr-2 h-4.5 w-4.5" /> Order Summary
                </h3>

                {/* Items preview list */}
                <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[220px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="py-3 flex items-center space-x-3 text-xs">
                      <img src={item.product.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg border border-gray-100 dark:border-gray-700 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-primary dark:text-white truncate">{item.product.name}</p>
                        <p className="text-[10px] text-gray-400">Qty: {item.quantity} {item.selectedSize && `• Size: ${item.selectedSize}`}</p>
                      </div>
                      <span className="font-bold text-primary dark:text-white">${item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-primary dark:text-white">${subtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span>-${discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-primary dark:text-white">{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (8%)</span>
                    <span className="text-primary dark:text-white">${tax}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm font-bold text-primary dark:text-white border-t border-gray-100 dark:border-gray-800 pt-3">
                    <span>Total Amount</span>
                    <span>${grandTotal}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-accent hover:bg-accent-dark text-white rounded-2xl text-xs font-bold shadow-lg transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </div>

              <div className="text-center">
                <Link to="/cart" className="text-xs text-gray-400 hover:text-accent font-semibold">
                  ← Return to Shopping Bag
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckoutPage;
