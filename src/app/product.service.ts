// import { Injectable, inject } from '@angular/core';
// import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, setDoc } from '@angular/fire/firestore';
// import { getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
// import { Storage } from '@angular/fire/storage';
// import { Observable } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   // private firestore = inject(Firestore); // ✅ Modular
//   private productCollection: CollectionReference<DocumentData>;
//   private categoryCollection: CollectionReference<DocumentData>;
//   private requestCollection: CollectionReference<DocumentData>;
//   private aboutUsCollection: CollectionReference<DocumentData>;
//   private roleCollection: CollectionReference<DocumentData>;
//   private cartCollection: CollectionReference<DocumentData>;
//   constructor(private firestore: Firestore ,private storage: Storage) {
//     this.productCollection = collection(this.firestore, 'Products');
//     this.requestCollection = collection(this.firestore, 'ContactRequests');
//     this.categoryCollection = collection(this.firestore, 'Category');
//     this.aboutUsCollection = collection(this.firestore, 'AboutUs');
//     this.roleCollection = collection(this.firestore, 'Roles');
//     this.cartCollection = collection(this.firestore, 'Carts');
//   }
//   getProducts() {
//     // const productsRef = collection(this.firestore, 'Products');
//     return collectionData(this.productCollection, { idField: 'id' });
//   }
//   getCategories() {
//     // const productsRef = collection(this.firestore, 'Products');
//     return collectionData(this.categoryCollection, { idField: 'id' });
//   }
//   getContactRequests() {
//     // const productsRef = collection(this.firestore, 'Products');
//     return collectionData(this.requestCollection, { idField: 'id' });
//   }
//   getAboutUs() {
//     // const productsRef = collection(this.firestore, 'Products');
//     return collectionData(this.aboutUsCollection, { idField: 'id' });
//   }
//   // async uploadImage(file: File): Promise<string> {
//   //   const filePath = `product-images/${Date.now()}_${file.name}`;
//   //   const fileRef = ref(this.storage, filePath);
//   //   await uploadBytes(fileRef, file);
//   //   return getDownloadURL(fileRef);
//   // }

//   addProduct(product: any) {
//     return addDoc(this.productCollection, product);
//   }
//   addRequest(request: any) {
//     return addDoc(this.requestCollection, request);
//   }
// // 
// addRole(userData: any) {
//   // Create a unique doc ID using uid + role
//   const roleDocId = `${userData.uid}_${userData.role}`;
//   const userRef = doc(this.firestore, 'Roles', roleDocId);
//   return setDoc(userRef, userData, { merge: true });
// }

// // import { doc, getDoc } from '@angular/fire/firestore';

// async getProductById(id: string): Promise<any> {
//   const productDocRef = doc(this.firestore, 'Products', id);
//   const productSnap = await getDoc(productDocRef);
//   if (productSnap.exists()) {
//     return { id: productSnap.id, ...productSnap.data() };
//   } else {
//     return null;
//   }
// }


// // add to cart

// addToCart(uid: string, product: any, quantity: number = 1) {
//   if (!product || !product.id || !product.title || !product.images?.[0]) {
//     throw new Error('Invalid product data: missing required fields');
//   }

//   const cartItemRef = doc(this.firestore, `Carts/${uid}/CartItems/${product.id}`);
//   return setDoc(cartItemRef, {
//     productId: product.id,
//     name: product.title,                 // 🟢 use 'title' instead of 'name'
//     price: product.saleprice ?? 0,      // 🟢 or use baseprice if needed
//     image: product.images[0],           // 🟢 take first image
//     quantity: quantity
//   }, { merge: true });
// }





// getCartItems(uid: string) {
//   const cartItemsCollection = collection(this.firestore, `Carts/${uid}/CartItems`);
//   return collectionData(cartItemsCollection, { idField: 'id' });
// }


// removeFromCart(uid: string, productId: string) {
//   const cartItemRef = doc(this.firestore, `Carts/${uid}/CartItems/${productId}`);
//   return deleteDoc(cartItemRef);
// }



//   // checkout
//   addOrder(orderData: any) {
//   const ordersCollection = collection(this.firestore, 'Orders');
//   return addDoc(ordersCollection, orderData);
// }

// // clearCart(uid: string) {
// //   const cartItemsCollection = collection(this.firestore, `Carts/${uid}/CartItems`);
// //   return collectionData(cartItemsCollection).subscribe(items => {
// //     items.forEach(item => {
// //       const cartItemRef = doc(this.firestore, `Carts/${uid}/CartItems/${item['id']}`);
// //       deleteDoc(cartItemRef); // Delete each cart item
// //     });
// //   });
// // }

// clearCart(uid: string): Observable<void> {
//     const cartItemsCollection = collection(this.firestore, `Carts/${uid}/CartItems`);
//     return new Observable<void>((observer) => {
//       const subscription = collectionData(cartItemsCollection).subscribe({
//         next: async (items) => {
//           // If no items in the cart, skip deletion
//           if (items.length === 0) {
//             console.log('Cart is empty, no items to delete.');
//             observer.complete(); // Finish the observable if no items to delete
//             return;
//           }

//           try {
//             console.log('Items to delete:', items); // Log the items to delete

//             // Create a list of promises to delete each item in the cart
//             const deletePromises = items.map(item => {
//               const cartItemRef = doc(this.firestore, `Carts/${uid}/CartItems/${item['id']}`);
//               return deleteDoc(cartItemRef); // Delete each item
//             });

//             // Wait for all deletions to finish
//             await Promise.all(deletePromises);

//             // After deletion, complete the observable
//             console.log('All cart items deleted successfully.');
//             observer.complete();
//           } catch (err) {
//             console.error('Error clearing cart:', err); // Log any error during deletion
//             observer.error(err); // If an error occurs, emit it
//           }
//         },
//         error: (err) => {
//           console.error('Error in cart data subscription:', err); // Log subscription errors
//           observer.error(err); // Pass error to observable observer
//         },
//       });

//       // Cleanup subscription on unsubscribe
//       return () => subscription.unsubscribe();
//     });
//   }



  
  
// }
import { Injectable } from '@angular/core';
import {
  Firestore, CollectionReference, DocumentData,
  addDoc, collection, collectionData, deleteDoc, doc, getDoc, setDoc,
  runTransaction
} from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { query, where } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productCollection: CollectionReference<DocumentData>;
  private categoryCollection: CollectionReference<DocumentData>;
  private requestCollection: CollectionReference<DocumentData>;
  private aboutUsCollection: CollectionReference<DocumentData>;
  private roleCollection: CollectionReference<DocumentData>;
  private cartCollection: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore, private storage: Storage) {
    this.productCollection = collection(this.firestore, 'Products');
    this.requestCollection = collection(this.firestore, 'ContactRequests');
    this.categoryCollection = collection(this.firestore, 'Category');
    this.aboutUsCollection = collection(this.firestore, 'AboutUs');
    this.roleCollection = collection(this.firestore, 'Roles');
    this.cartCollection = collection(this.firestore, 'Carts');
  }

  // ---------- PRODUCTS ----------
  getProducts() {
    return collectionData(this.productCollection, { idField: 'id' });
  }

  getProductById(id: string): Promise<any> {
    const productDocRef = doc(this.firestore, 'Products', id);
    return getDoc(productDocRef).then(snap => snap.exists() ? { id: snap.id, ...snap.data() } : null);
  }

  addProduct(product: any) {
    return addDoc(this.productCollection, product);
  }

  // ---------- CATEGORIES ----------
  getCategories() {
    return collectionData(this.categoryCollection, { idField: 'id' });
  }

  // ---------- ABOUT US ----------
  getAboutUs() {
    return collectionData(this.aboutUsCollection, { idField: 'id' });
  }

  // ---------- CONTACT REQUESTS ----------
  addRequest(request: any) {
    return addDoc(this.requestCollection, request);
  }

  getContactRequests() {
    return collectionData(this.requestCollection, { idField: 'id' });
  }

  getOrdersByUserId(userId: string): Observable<any[]> {
  const ordersRef = collection(this.firestore, 'Orders');
  const userOrdersQuery = query(ordersRef, where('userId', '==', userId));
  return collectionData(userOrdersQuery, { idField: 'id' });
}

async getTopOrderedProducts(limit: number = 5): Promise<any[]> {
  const ordersRef = collection(this.firestore, 'Orders');
  const ordersSnapshot = await getDocs(ordersRef);

  const productOrderCounts: Record<string, number> = {};

  // Loop over orders and count product IDs
  ordersSnapshot.forEach(orderDoc => {
    const orderData = orderDoc.data();
    const products = orderData['products'];

    if (Array.isArray(products)) {
      for (const item of products) {
        const productId = item.productId;
        if (productId) {
          productOrderCounts[productId] = (productOrderCounts[productId] || 0) + 1;
        }
      }
    }
  });

  // Convert the counts object into a sorted array
  const sortedProductIds = Object.entries(productOrderCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by count descending
    .slice(0, limit)             // Get top N products
    .map(([productId]) => productId);

  // Fetch product details
  const topProducts: any[] = [];

  for (const productId of sortedProductIds) {
    const productRef = doc(this.firestore, 'Products', productId);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      topProducts.push({ id: productId, ...productSnap.data(), orderCount: productOrderCounts[productId] });
    }
  }

  return topProducts;
}


async getFeaturedProducts() {
  const productsRef = collection(this.firestore, 'Products');
  
  // Create a query to filter products where the 'featured' field is equal to 'Featured'
  const featuredQuery = query(productsRef, where('featured', '==', 'Featured'));
  
  // Execute the query and get the documents
  const querySnapshot = await getDocs(featuredQuery);
  
  // Map through the documents and return the product data
  const products = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return products;
}

  // ---------- ROLES ----------
  addRole(userData: any) {
    const roleDocId = `${userData.uid}_${userData.role}`;
    const userRef = doc(this.firestore, 'Roles', roleDocId);
    return setDoc(userRef, userData, { merge: true });
  }

  // ---------- CART ----------
  async addToCart(uid: string, product: any, quantity: number = 1) {
    if (!product || !product.id || !product.title || !product.images?.[0]) {
      throw new Error('Invalid product data: missing required fields');
    }

    // Ensure parent cart document exists (important!)
    const cartRef = doc(this.firestore, `Carts/${uid}`);
    await setDoc(cartRef, {}, { merge: true });

    const cartItemRef = doc(this.firestore, `Carts/${uid}/CartItems/${product.id}`);
    return setDoc(cartItemRef, {
      productId: product.id,
      name: product.title,
      price: product.saleprice ?? 0,
      image: product.images[0],
      quantity: quantity
    }, { merge: true });
  }

  getCartItems(uid: string) {
    const cartItemsCollection = collection(this.firestore, `Carts/${uid}/CartItems`);
    return collectionData(cartItemsCollection, { idField: 'id' });
  }

  removeFromCart(uid: string, productId: string) {
    const cartItemRef = doc(this.firestore, `Carts/${uid}/CartItems/${productId}`);
    return deleteDoc(cartItemRef);
  }

  clearCart(uid: string): Observable<void> {
    const cartItemsCollection = collection(this.firestore, `Carts/${uid}/CartItems`);
    return new Observable<void>((observer) => {
      const subscription = collectionData(cartItemsCollection, { idField: 'id' }).subscribe({
        next: async (items) => {
          if (items.length === 0) {
            console.log('Cart is empty, no items to delete.');
            observer.complete();
            return;
          }

          try {
            console.log('Items to delete:', items);
            const deletePromises = items.map(item => {
              const cartItemRef = doc(this.firestore, `Carts/${uid}/CartItems/${item['id']}`);
              return deleteDoc(cartItemRef);
            });
            await Promise.all(deletePromises);
            console.log('All cart items deleted successfully.');
            observer.complete();
          } catch (err) {
            console.error('Error clearing cart:', err);
            observer.error(err);
          }
        },
        error: (err) => {
          console.error('Error in cart data subscription:', err);
          observer.error(err);
        }
      });

      return () => {
        console.log('Unsubscribing from cart clear operation');
        subscription.unsubscribe();
      };
    });
  }

  // ---------- ORDERS ----------
  addOrder(orderData: any) {
    const ordersCollection = collection(this.firestore, 'Orders');
    return addDoc(ordersCollection, orderData);
  }

  // ---------- IMAGE UPLOAD (Optional) ----------
  async uploadImage(file: File): Promise<string> {
    const filePath = `product-images/${Date.now()}_${file.name}`;
    const fileRef = ref(this.storage, filePath);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

async updateStockForOrder(cartItems: any[]): Promise<void> {
  const db = this.firestore;

  await runTransaction(db, async (transaction) => {
    for (const item of cartItems) {
      const productRef = doc(db, 'Products', item.productId);
      const productSnap = await transaction.get(productRef);

      if (!productSnap.exists()) {
        throw new Error(`Product with ID ${item.productId} does not exist`);
      }

      const currentStock = productSnap.data()['stock'] ?? 0;

      if (currentStock < item.quantity) {
        throw new Error(`Not enough stock for ${item.name}`);
      }

      // Update stock
      transaction.update(productRef, {
        stock: currentStock - item.quantity
      });
    }
  });
}


}
