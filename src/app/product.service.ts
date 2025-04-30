import { Injectable, inject } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private firestore = inject(Firestore); // ✅ Modular
  private productCollection: CollectionReference<DocumentData>;
  private categoryCollection: CollectionReference<DocumentData>;
  private requestCollection: CollectionReference<DocumentData>;
  constructor(private firestore: Firestore ,private storage: Storage) {
    this.productCollection = collection(this.firestore, 'Products');
    this.requestCollection = collection(this.firestore, 'ContactRequests');
    this.categoryCollection = collection(this.firestore, 'Category');
  }
  getProducts() {
    // const productsRef = collection(this.firestore, 'Products');
    return collectionData(this.productCollection, { idField: 'id' });
  }
  getCategories() {
    // const productsRef = collection(this.firestore, 'Products');
    return collectionData(this.categoryCollection, { idField: 'id' });
  }
  getContactRequests() {
    // const productsRef = collection(this.firestore, 'Products');
    return collectionData(this.requestCollection, { idField: 'id' });
  }

  // async uploadImage(file: File): Promise<string> {
  //   const filePath = `product-images/${Date.now()}_${file.name}`;
  //   const fileRef = ref(this.storage, filePath);
  //   await uploadBytes(fileRef, file);
  //   return getDownloadURL(fileRef);
  // }

  addProduct(product: any) {
    return addDoc(this.productCollection, product);
  }
  addRequest(request: any) {
    return addDoc(this.requestCollection, request);
  }
}
