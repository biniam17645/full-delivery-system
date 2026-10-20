/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageType, ToastMessage, CartItem, ActiveOrder } from './types/navigation';
import { Product } from './types';
import { INITIAL_MERCHANTS, INITIAL_PRODUCTS } from './data/mockData';

// Public Landing Pages
import { Navbar } from './components/navigation/Navbar';
import { AnimatedBikeTrack } from './components/navigation/AnimatedBikeTrack';
import { HomePage } from './components/home/HomePage';
import { AboutPage } from './components/about/AboutPage';
import { ConsumersPage } from './components/consumers/ConsumersPage';
import { RidersPage } from './components/riders/RidersPage';
import { MerchantsPage } from './components/merchants/MerchantsPage';
import { ContactPage } from './components/contact/ContactPage';
import { Footer } from './components/footer/Footer';
import { ToastContainer } from './components/common/Toast';

// Post-Login Service Dashboards
import { CustomerDashboard } from './components/dashboard/CustomerDashboard';
import { LiveOrderTracking } from './components/dashboard/LiveOrderTracking';
import { KitchenDisplaySystem } from './components/merchant/KitchenDisplaySystem';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [outOfStockItemIds, setOutOfStockItemIds] = useState<string[]>([]);

  // Default active order for demonstration
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>({
    id: 'ord-initial',
    orderNumber: 'KCH-4829',
    customerName: 'Abebe Bikila',
    customerPhone: '+251 911 234 567',
    deliveryAddress: 'Stadium Area, Villa #14 (Kebele 03), Asela',
    kebele: 'Kebele 03',
    items: [
      { name: 'Special Asela Beef Tibs', quantity: 1, priceBirr: 320, notes: 'Extra spicy awaze, well done' },
      { name: 'Special Habesha Macchiato', quantity: 2, priceBirr: 110, notes: 'Medium sugar' },
    ],
    subtotalBirr: 430,
    deliveryFeeBirr: 25,
    serviceFeeBirr: 10,
    totalBirr: 465,
    paymentMethod: 'telebirr',
    paymentStatus: 'paid',
    status: 'on_the_way',
    placedAt: '12:35 PM',
    estimatedMinutes: 14,
    riderName: 'Dawit Mengistu',
    riderPhone: '+251 912 888 999',
    riderVehicle: 'KECH Eco-Bicycle #07',
    riderRating: 4.95,
    merchantName: 'Ras Hotel Restaurant Asela',
    merchantLocation: 'Central Avenue, Kebele 01',
  });

  const addToast = (type: 'success' | 'info' | 'warning', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Management
  const handleAddToCart = (product: Product, quantity: number, notes: string, options: string[]) => {
    const merchant = INITIAL_MERCHANTS.find((m) => m.id === product.merchantId);
    const existingIndex = cart.findIndex((item) => item.productId === product.id && item.customizationNotes === notes);

    if (existingIndex > -1) {
      setCart((prev) => {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      });
    } else {
      const newItem: CartItem = {
        id: 'cart-' + Date.now() + Math.random().toString(36).substring(2, 5),
        productId: product.id,
        merchantId: product.merchantId,
        merchantName: merchant?.name.en || 'Asela Merchant',
        name: product.name.en,
        priceBirr: product.basePriceBirr,
        quantity,
        imageUrl: product.imageUrl,
        customizationNotes: notes,
        selectedOptions: options,
      };
      setCart((prev) => [...prev, newItem]);
    }

    addToast('success', 'Added to Cart', `${quantity}x ${product.name.en} added to your delivery cart.`);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    addToast('info', 'Item Removed', 'Item was removed from your cart.');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handlePlaceOrder = (newOrder: ActiveOrder) => {
    setActiveOrder(newOrder);
    navigateTo('live-tracking');
    addToast(
      'success',
      'Order Placed Successfully!',
      `Order #${newOrder.orderNumber} sent to kitchen! Live dispatch tracking is active.`
    );
  };

  const handleAdvanceOrderStatus = (orderId: string) => {
    if (!activeOrder) return;
    const stages: ActiveOrder['status'][] = [
      'order_placed',
      'merchant_preparing',
      'rider_picked_up',
      'on_the_way',
      'delivered',
    ];
    const currentIndex = stages.indexOf(activeOrder.status);
    const nextIndex = (currentIndex + 1) % stages.length;
    const nextStatus = stages[nextIndex];

    setActiveOrder((prev) => (prev ? { ...prev, status: nextStatus } : null));

    const statusLabels: Record<string, string> = {
      order_placed: 'Order Placed at Kitchen',
      merchant_preparing: 'Merchant Preparing Food',
      rider_picked_up: 'Bicycle Rider Picked Up Package',
      on_the_way: 'Courier On The Way to Your Address',
      delivered: 'Delivered Safely to Customer!',
    };

    addToast('info', 'Order Status Updated', statusLabels[nextStatus]);
  };

  const handleToggleItemStock = (productId: string) => {
    setOutOfStockItemIds((prev) => {
      const exists = prev.includes(productId);
      const prod = INITIAL_PRODUCTS.find((p) => p.id === productId);
      if (exists) {
        addToast('success', 'Item Restocked', `${prod?.name.en || 'Item'} is now available to order on the app.`);
        return prev.filter((id) => id !== productId);
      } else {
        addToast('warning', 'Marked Out of Stock', `${prod?.name.en || 'Item'} marked as sold out. App ordering disabled.`);
        return [...prev, productId];
      }
    });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-gray-50 text-gray-800 flex flex-col min-h-screen">
      {/* 1. Global Navigation Bar */}
      <Navbar 
        currentPage={currentPage} 
        navigateTo={navigateTo}
        cartCount={totalCartCount}
        onOpenCart={() => navigateTo('customer-dashboard')}
        activeOrder={activeOrder}
      />

      {/* 2. Top Animated Bike Track (Shown on Landing and Informational Pages) */}
      {!['customer-dashboard', 'merchant-kds'].includes(currentPage) && (
        <AnimatedBikeTrack />
      )}

      {/* 3. Main Multi-Page Content Area */}
      <main className="flex-grow">
        {/* Public Landing Pages */}
        {currentPage === 'home' && (
          <HomePage 
            navigateTo={navigateTo} 
            onApkDownload={() => addToast('success', 'Download Started', 'Downloading KECH Delivery v2.4.0 APK for Android...')} 
            onPlayStoreClick={() => addToast('info', 'Google Play', 'Redirecting to Google Play Store listing...')} 
          />
        )}

        {currentPage === 'about' && (
          <AboutPage />
        )}

        {currentPage === 'consumers' && (
          <ConsumersPage 
            onNotify={addToast} 
            onLoginSuccess={() => navigateTo('customer-dashboard')}
          />
        )}

        {currentPage === 'riders' && (
          <RidersPage onNotify={addToast} />
        )}

        {currentPage === 'merchants' && (
          <MerchantsPage 
            onNotify={addToast} 
            onOpenKdsPortal={() => navigateTo('merchant-kds')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNotify={addToast} />
        )}

        {/* Post-Login Service Portals */}
        {currentPage === 'customer-dashboard' && (
          <CustomerDashboard 
            merchants={INITIAL_MERCHANTS}
            products={INITIAL_PRODUCTS}
            cart={cart}
            activeOrder={activeOrder}
            onAddToCart={handleAddToCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onRemoveCartItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onPlaceOrder={handlePlaceOrder}
            onViewLiveOrder={() => navigateTo('live-tracking')}
            onLogout={() => {
              navigateTo('home');
              addToast('info', 'Logged Out', 'Returned to public landing page.');
            }}
            outOfStockItemIds={outOfStockItemIds}
          />
        )}

        {currentPage === 'live-tracking' && (
          <LiveOrderTracking 
            order={activeOrder}
            onAdvanceOrderStatus={handleAdvanceOrderStatus}
            onBackToDashboard={() => navigateTo('customer-dashboard')}
          />
        )}

        {currentPage === 'merchant-kds' && (
          <KitchenDisplaySystem 
            products={INITIAL_PRODUCTS}
            outOfStockItemIds={outOfStockItemIds}
            onToggleItemStock={handleToggleItemStock}
            onNotify={addToast}
          />
        )}

        {currentPage === 'rider-duty' && (
          <RidersPage onNotify={addToast} />
        )}
      </main>

      {/* 4. Global Footer (Hidden on KDS for full-screen tablet mode) */}
      {currentPage !== 'merchant-kds' && (
        <Footer 
          navigateTo={navigateTo} 
          onSubscribeNewsletter={(email) => {
            addToast('success', 'Subscribed', `Thank you! Exclusive Asela deals will be sent to ${email}.`);
          }} 
        />
      )}

      {/* 5. Notification Toast Feedback */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

export default App;
