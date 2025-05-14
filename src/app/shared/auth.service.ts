// import { Injectable } from '@angular/core';
// import { GoogleAuthProvider, sendEmailVerification, user } from '@angular/fire/auth';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { Router } from '@angular/router';
// import { map } from 'rxjs/operators';
// import { ProductService } from '../product.service';
// import { ToastrService } from 'ngx-toastr';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(private productService: ProductService, private fireauth:AngularFireAuth, private router:Router,private toastr: ToastrService) { }
//   login(email: string , password: string) {
    
//     this.fireauth.signInWithEmailAndPassword(email,password).then((res) => {
      
//       localStorage.setItem("token", JSON.stringify(res.user?.uid));
//        alert("login");
//     /////////////
//     this.fireauth.currentUser.then(user => {
//       if (user) {
//         // User is logged in
//          console.log(user);
//         localStorage.setItem("User data", JSON.stringify({ "uid": user.uid, "email": user.email, "name": user.displayName, "image": user.photoURL, "phone":user.phoneNumber}));
//         // this.router.navigate(['/home']);
//         location.href='/home'; 
        
//         // Access user properties like user.uid, user.email, etc.
//       } else {
//         // User is logged out
//         console.log('No user logged in.');
//       }
//     });
//     //////////////////////////////////
//     },err=>{
//        alert(err.message);
//       // this.router.navigate(['/user-login']);
//       location.href='/user-login'; 
//     })
   
//   }

//   register(email: string, password: string) {
//     this.fireauth.createUserWithEmailAndPassword(email, password).then(async res => {
//       const uid = res.user?.uid;
//       if (uid) {
//         const userData = {
//           email: res.user?.email,
//           role: "User",
//           uid: uid
//         };
//         await this.productService.addRole(userData); // Add role if new
//       }
//       alert("User created successfully");
  
//     }),(error: { message: any; })=>{
     
//           alert(error.message);
//           // this.router.navigate(['/user-register']);
//           location.href='/user-register'; 
//         }
//   }
  

//   // register(email: string, password: string) {
//   //   this.fireauth.createUserWithEmailAndPassword(email, password).then(async res => {
//   //     const uid = res.user?.uid;
//   //     if (uid) {
//   //       const userData = {
//   //         email: res.user?.email,
//   //         role: "user",
//   //         uid: uid
//   //       };
  
//   //       // Add role to Firestore via your productService
//   //       this.productService.addRole(userData);
//   //       alert('Role added to Firestore');
  
//   //       console.log('res.user', res.user?.email);
//   //       console.log('res.user', res.user?.uid);
//   //     }
  
//   //     alert("User created successfully");
  
//   //   }).catch(async error => {
//   //     // Check if error is due to existing user
//   //     if (error.code === 'auth/email-already-in-use') {
//   //       try {
//   //         // Sign in to get the UID
//   //         const loginRes = await this.fireauth.signInWithEmailAndPassword(email, password);
//   //         const uid = loginRes.user?.uid;
//   //         if (uid) {
//   //           const userDatas = {
//   //             email: loginRes.user?.email,
//   //             role: "user", // Or your dynamic role
//   //             uid: uid
//   //           };
//   //           // Add role or update in Firestore
//   //           this.productService.addRole(userDatas);
//   //           alert('User already exists. Role added to Firestore.');
//   //         }
//   //       } catch (loginError: unknown) {
//   //         if (loginError instanceof Error) {
//   //           alert('User exists but login failed: ' + loginError.message);
//   //         } else {
//   //           alert('User exists but login failed due to unknown error.');
//   //         }
//   //       }
//   //     } else {
//   //       alert('Registration failed: ' + error.message);
//   //     }
  
//   //     // location.href = '/user-register';
//   //   });
//   // }
  
//   // register(email: string , password: string) {
  
//   //   this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
//   //     const uid = res.user?.uid;
//   //     if (uid){
//   //       this.fireauth.updateCurrentUser(res.user).then()
//   //       const userData = {
//   //         email: res.user?.email,
//   //         role: "user",
//   //         uid: res.user?.uid
//   //       };
//   //       this.productService.addRole(userData);
        
//   //     }
//   //     alert("created");
     
//   //     // location.href='/user-login'; 
//   //   },error=>{
     
//   //     alert(error.message);
//   //     // this.router.navigate(['/user-register']);
//   //     location.href='/user-register'; 
//   //   })
//   // }

//   logout() {
//     this.fireauth.signOut().then(() => {
//       localStorage.removeItem("token");
//       localStorage.removeItem("User data");
//       // this.router.navigate(['/user-login']);
//       location.href='/user-login';
      
//     },error=>{
//       alert(error.message);
//       // this.router.navigate(['/user-login']);
//       location.href='/user-login';
//     })
//   }

//   forgotpassword(email:string) {
//     this.fireauth.sendPasswordResetEmail(email).then(() => {
      
//       alert("Please check your email inbox and verify your email.");
//     },error=>{
//       alert(error.message);
//     })
//   }

//   sendEmailVerification(user:any){
    
//     user.sendEmailVerification().then((res:any)=>{
//       alert("Please check your email inbox and verify your email.");
//       // this.router.navigate(['/user-login']);
//       location.href='/user-login';
//     },(error:any)=>{
//       alert(error.message);
//     }
    
//     )
//   }

//   googlesign(){
    
//     return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res=>{
     
//       // this.router.navigate(['/home']);
//       location.href='/home';
//       localStorage.setItem("token", JSON.stringify(res.user?.uid));
//       this.fireauth.currentUser.then(user => {
//         if (user) {
//           // User is logged in
//            console.log(user);
//           localStorage.setItem("User data", JSON.stringify({ "uid": user.uid, "email": user.email, "name": user.displayName, "image": user.photoURL, "phone":user.phoneNumber}));
//           // this.router.navigate(['/home']);
//           // location.href='/home'; 
          
//           // Access user properties like user.uid, user.email, etc.
//         } else {
//           // User is logged out
//           console.log('No user logged in.');
//         }
//       });
//     },error=>{
//       alert(error.message);
//     }
//     )
//   }
// }
import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import Swal from 'sweetalert2';
import { LoadScriptService } from '../load-script.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private productService: ProductService,
    private fireauth: AngularFireAuth,
    private router: Router,private loadScript: LoadScriptService
  ) { }
ngAfterViewInit(): void {
    this.loadScript.loadScript();
  }
  login(email: string, password: string): Promise<void> {
  return this.fireauth.signInWithEmailAndPassword(email, password).then(async (res) => {
    localStorage.setItem("token", JSON.stringify(res.user?.uid));

    await Swal.fire('Welcome', 'Login successful', 'success');

    return this.fireauth.currentUser.then(user => {
      if (user) {
        localStorage.setItem("User data", JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
          phone: user.phoneNumber
        }));
        this.router.navigate(['/home']);
      } else {
        console.log('No user logged in.');
      }
    });
  }).catch(async err => {
    await Swal.fire('Login Failed', err.message, 'error');
    this.router.navigate(['/user-login']);
    throw err; // important to allow `.catch()` in component
  });
}

  // login(email: string, password: string) {
  //   this.fireauth.signInWithEmailAndPassword(email, password).then(async (res) => {
  //     localStorage.setItem("token", JSON.stringify(res.user?.uid));

  //     await Swal.fire('Welcome', 'Login successful', 'success');

  //     this.fireauth.currentUser.then(user => {
  //       if (user) {
  //         localStorage.setItem("User data", JSON.stringify({
  //           uid: user.uid,
  //           email: user.email,
  //           name: user.displayName,
  //           image: user.photoURL,
  //           phone: user.phoneNumber
  //         }));
  //         // location.href = '/home';
  //         this.router.navigate(['/home']);
  //       } else {
  //         console.log('No user logged in.');
  //       }
  //     });
  //   }, async err => {
  //     await Swal.fire('Login Failed', err.message, 'error');
  //     // location.href = '/user-login';
  //     this.router.navigate(['/user-login']);
  //   });
  // }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(async res => {
      const uid = res.user?.uid;
      if (uid) {
        const userData = {
          email: res.user?.email,
          role: "User",
          uid: uid
        };
        await this.productService.addRole(userData);
      }
      await Swal.fire('Registration Success', 'User created successfully', 'success');
    }, async error => {
      await Swal.fire('Registration Error', error.message, 'error');
      // location.href = '/user-register';
      this.router.navigate(['/user-register']);
    });
  }

  logout() {
    this.fireauth.signOut().then(async () => {
      localStorage.removeItem("token");
      localStorage.removeItem("User data");
      await Swal.fire('Logout', 'Logged out successfully', 'success');
      // location.href = '/user-login';
      this.router.navigate(['/user-login']);
    }, async error => {
     await Swal.fire('Logout Error', error.message, 'error');
      // location.href = '/user-login';
      this.router.navigate(['/user-login']);
    });
  }

  forgotpassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      Swal.fire('Check your inbox', 'Password reset email sent', 'success');
    }, error => {
      Swal.fire('Error', error.message, 'error');
    });
  }

  sendEmailVerification(user: any) {
    user.sendEmailVerification().then(() => {
      Swal.fire('Verification Email Sent', 'Check your inbox to verify your email.', 'success');
      // location.href = '/user-login';
      this.router.navigate(['/user-login']);
    }, (error: any) => {
      Swal.fire('Email Verification Error', error.message, 'error');
    });
  }

  googlesign() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(async res => {
      await Swal.fire('Welcome', 'Signed in with Google', 'success');
      // location.href = '/home';
      this.router.navigate(['/home']);
      localStorage.setItem("token", JSON.stringify(res.user?.uid));

      this.fireauth.currentUser.then(user => {
        if (user) {
          localStorage.setItem("User data", JSON.stringify({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            image: user.photoURL,
            phone: user.phoneNumber
          }));
        } else {
          console.log('No user logged in.');
        }
      });
    }, async error => {
     await Swal.fire('Google Sign-In Error', error.message, 'error');
    });
  }
}
