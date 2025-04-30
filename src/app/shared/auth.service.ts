import { Injectable } from '@angular/core';
import { GoogleAuthProvider, sendEmailVerification, user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth:AngularFireAuth, private router:Router) { }
  login(email: string , password: string) {
    
    this.fireauth.signInWithEmailAndPassword(email,password).then(() => {
      
      localStorage.setItem("token", "true");
       alert("login");
    /////////////
    this.fireauth.currentUser.then(user => {
      if (user) {
        // User is logged in
        // console.log(user);
        localStorage.setItem("User data", JSON.stringify({ "uid": user.uid, "email": user.email, "name": user.displayName, "image": user.photoURL, "phone":user.phoneNumber}));
        // this.router.navigate(['/home']);
        location.href='/home'; 
        
        // Access user properties like user.uid, user.email, etc.
      } else {
        // User is logged out
        console.log('No user logged in.');
      }
    });
    //////////////////////////////////
    },err=>{
       alert(err.message);
      // this.router.navigate(['/user-login']);
      location.href='/user-login'; 
    })
   
  }

 

  register(email: string , password: string) {
  
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert("created");
      //  this.sendEmailVerification(res.user);
      this.fireauth.updateCurrentUser(res.user).then()
      // this.router.navigate(['/user-login']);
      location.href='/user-login'; 
    },error=>{
      alert(error.message);
      // this.router.navigate(['/user-register']);
      location.href='/user-register'; 
    })
  }

  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("User data");
      // this.router.navigate(['/user-login']);
      location.href='/user-login';
      
    },error=>{
      alert(error.message);
      // this.router.navigate(['/user-login']);
      location.href='/user-login';
    })
  }

  forgotpassword(email:string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      
      alert("Please check your email inbox and verify your email.");
    },error=>{
      alert(error.message);
    })
  }

  sendEmailVerification(user:any){
    
    user.sendEmailVerification().then((res:any)=>{
      alert("Please check your email inbox and verify your email.");
      // this.router.navigate(['/user-login']);
      location.href='/user-login';
    },(error:any)=>{
      alert(error.message);
    }
    
    )
  }

  googlesign(){
    
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res=>{
      // this.router.navigate(['/home']);
      location.href='/home';
      localStorage.setItem("token", JSON.stringify(res.user?.uid));
    },error=>{
      alert(error.message);
    }
    )
  }
}
