
let signupFunctionality = () => {
  // start Total SignUp Button Functionality ...=>
  let signup = document.querySelector("#signup-fun");
  let signupModel = document.querySelector("#signupModal");
  let signupClosebtn = document.querySelector("#signupModal i");
  let signupGmail = document.querySelector("#signupGmail #mobile");
  // pick the actual Sign Up button (the file input also has class 'submit')
  let signupSubmitBtn = signupModel.querySelector("button.submit:not(#get-otp)");
  let signupOTP = document.querySelector("#passwordGmain #password");
  let getotp = document.querySelector("#get-otp");
  let generatedOTP = null; // OTP store korar jonno variable
  let signupUsername = document.querySelector("#signupUsername input");
  let modal = document.querySelector("#loginModal");
  let ancharsignin = document.querySelector("#ancharLog");
  // scope file input to signup modal only
  let newimage = signupModel.querySelector(".profilePicture input");

  signup.addEventListener("click", () => {
    signupModel.classList.add("show");
  });

  signupClosebtn.addEventListener("click", () => {
    signupModel.classList.remove("show");
  });
  ancharsignin.addEventListener("click", () => {
    modal.classList.add("show");
    signupModel.classList.remove("show");
  });

  signupModel.addEventListener("click", (e) => {
    if (e.target === signupModel) {
      signupModel.classList.remove("show");
    }
  });

  // NOTE: file-change handling for profile uploads is handled in
  // uploadProfilePictureFunctionality(). Do not attach a change
  // listener here because it caused the file-input click to be
  // treated as the signup button (the input also had class 'submit').
  // Get OTP button e click korle OTP generate hobe
  getotp.addEventListener("click", () => {
    let email = signupGmail.value.trim();

    if (email === "") {
      alert("Please enter your email or mobile number first!");
      return;
    }

    // Random 6 digit OTP generate
    generatedOTP = Math.floor(100000 + Math.random() * 900000);
    alert(`Your OTP is: ${generatedOTP}`);
  });

  // Signup process - submit button e click hole call hobe
  const signupProcess = () => {
    let username = signupUsername.value.trim();
    let email = signupGmail.value.trim();
    let enteredOTP = signupOTP.value.trim();

    if (email === "") {
      alert("Please enter your email or mobile number!");
      return;
    }

    if (username === "") {
      alert("Please enter your Username ");
      return;
    }

    if (generatedOTP === null) {
      alert("Please generate OTP first by clicking 'Get OTP' button!");
      return;
    }

    if (enteredOTP === "") {
      alert("Please enter the OTP!");
      return;
    }

    // OTP verify - string to number convert kore compare
    if (parseInt(enteredOTP) === generatedOTP) {
      // localStorage theke existing users array retrieve korbo
      let allUsers = localStorage.getItem("Users");
      let usersArray = allUsers ? JSON.parse(allUsers) : [];

      // Check if email already exists
      let existingUser = usersArray.find((user) => user.email === email);
      if (existingUser) {
        alert("This email is already registered! ❌");
        return;
      }

      let exitingUsername = usersArray.find(
        (user) => user.username === username
      );
      if (exitingUsername) {
        alert(`${username} is Already exit try another name `);
        return;
      }

      // Function to create and save user with profile image
      const saveUserWithImage = (profileImageData) => {
        // New user data create
        let newUser = {
          email: email,
          username: username,
          registeredAt: new Date().toLocaleString(),
          profileImage: profileImageData, // DataURL or null
        };

        // Array te new user add korbo
        usersArray.push(newUser);

        // Updated array localStorage e save korbo
        localStorage.setItem("Users", JSON.stringify(usersArray));

        // Current user set korbo (login state maintain korar jonno)
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        alert(
          `Signup Success! ✅ Welcome ${username}! Total users: ${usersArray.length}`
        );

        // Modal close kore debo
        signupModel.classList.remove("show");

        // Form reset
        signupGmail.value = "";
        signupOTP.value = "";
        signupUsername.value = "";
        newimage.value = "";
        generatedOTP = null;

        // Image update korbo page e
        let currimage = document.querySelector(".picture img");
        if (profileImageData && currimage) {
          currimage.src = profileImageData;
        }
      };

      // Check if user selected a profile image
      let file = newimage.files && newimage.files[0];
      if (file) {
        // Validate file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedTypes.includes(file.type)) {
          alert("Please select a valid image file (JPG, JPEG, PNG)");
          return;
        }

        // Read file and convert to DataURL
        let reader = new FileReader();
        reader.onload = (e) => {
          saveUserWithImage(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        // No image selected, save without profile image
        saveUserWithImage(null);
      }
    } else {
      alert("Invalid OTP! ❌ Please try again.");
    }
  };

  // Submit button e click korle signupProcess call hobe
  signupSubmitBtn.addEventListener("click", signupProcess);
  //End total signup functionality ......<=
};
let loginFunctinality = () => {
  //start total login Functionality ......=>
  let login = document.querySelector("#login-fun");
  let modal = document.querySelector("#loginModal");
  let closeBtn = document.querySelector("#closeModal");
  let logingamil = document.querySelector("#login-gmail input");
  let loginpass = document.querySelector("#login-pass input");
  // pick the actual Login button (there are other .submit elements like file input)
  let _loginButtons = modal.querySelectorAll("button.submit");
  let loginSubmitBtn = _loginButtons[_loginButtons.length - 1];
  let anchorlink = document.querySelector(".singn-log");
  let signupModel = document.querySelector("#signupModal");
  // scope file input to the login modal
  let newimage = modal.querySelector(".profilePicture input");
  let deleteimage = document.querySelector(".profilePicture button");
  let currentImg = document.querySelector(".picture img");
  // Login button e click korle modal open hobe
  login.addEventListener("click", () => {
    modal.classList.add("show");
  });

  anchorlink.addEventListener("click", () => {
    signupModel.classList.add("show");
    modal.classList.remove("show");
  });
  
  // Close button e click korle modal close hobe
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // Overlay e click korle modal close hobe
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  const loginProcess = () => {
    let loginUserGmail = logingamil.value.trim();
    let loginUserName = loginpass.value.trim();

    // Validation
    if (loginUserGmail === "") {
      alert("Please enter your email!");
      
      return;
    }

    if (loginUserName === "") {
      alert("Please enter your username!");
      
      return;
    }

    // localStorage theke users array retrieve
    let allUsers = localStorage.getItem("Users");

    if (!allUsers) {
      alert("No users found! Please signup first.");
      return;
    }

    let usersArray = JSON.parse(allUsers);
    console.log(usersArray);
    // Users array te matching user khujbo
    let foundUser = usersArray.find(
      (user) => user.email === loginUserGmail && user.username === loginUserName
    );

    

    if (foundUser) {
      alert(`Login Successful! ✅ Welcome back ${foundUser.username}!`);
      
      // Current user set korbo localStorage e
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      
      // Profile image load korbo
      if (foundUser.profileImage && currentImg) {
        currentImg.src = foundUser.profileImage;
      } else if (currentImg) {
        currentImg.src = "new.jpg";
      }
      
      modal.classList.remove("show");
      logingamil.value = "";
      loginpass.value = "";
    } else {
      alert("Invalid email or username! ❌ Please try again.");
    }
  };
   
  loginSubmitBtn.addEventListener("click", loginProcess);
};
let uploadProfilePictureFunctionality = ()=>{
  let currimage = document.querySelector(".picture img");
  let newimage = document.querySelector(".profilePicture input");
  let deleteimage = document.querySelector(".profilePicture button");

  // Page load e current user er image load korbo
  window.addEventListener("load",()=>{
    let currentUserData = localStorage.getItem("currentUser");
    if(currentUserData){
      let currentUser = JSON.parse(currentUserData);
      if(currentUser.profileImage && currimage){
        currimage.src = currentUser.profileImage;
      }
    }
  })

  // Naya image upload korle
  newimage.addEventListener("change",(e)=>{
    let file = e.target.files[0];
    if(!file) return;
    
    // File type validation
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please select a valid image file (JPG, JPEG, PNG)");
      return;
    }
    
    let reader = new FileReader();
    reader.onload = (eve)=>{
      currimage.src = eve.target.result;
      
      // Current user er profile image update korbo
      let currentUserData = localStorage.getItem("currentUser");
      if(currentUserData){
        let currentUser = JSON.parse(currentUserData);
        currentUser.profileImage = eve.target.result;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        
        // Users array te o update korbo
        let allUsers = localStorage.getItem("Users");
        if(allUsers){
          let usersArray = JSON.parse(allUsers);
          let userIndex = usersArray.findIndex(u => u.email === currentUser.email);
          if(userIndex !== -1){
            usersArray[userIndex].profileImage = eve.target.result;
            localStorage.setItem("Users", JSON.stringify(usersArray));
          }
        }
      }
    }
    reader.readAsDataURL(file);
  })
    
  deleteimage.addEventListener("click",()=>{
    currimage.src = "new.jpg";
    
    // Current user er profile image remove korbo
    let currentUserData = localStorage.getItem("currentUser");
    if(currentUserData){
      let currentUser = JSON.parse(currentUserData);
      currentUser.profileImage = null;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      
      // Users array theke o remove korbo
      let allUsers = localStorage.getItem("Users");
      if(allUsers){
        let usersArray = JSON.parse(allUsers);
        let userIndex = usersArray.findIndex(u => u.email === currentUser.email);
        if(userIndex !== -1){
          usersArray[userIndex].profileImage = null;
          localStorage.setItem("Users", JSON.stringify(usersArray));
        }
      }
    }
    newimage.value = '';
  })

}
let hamBurgerFunctionality = () => {
  let hamburger = document.querySelector(".logo i");
  let hamDiv = document.querySelector(".humberger");
  let closeHamburger = document.querySelector(".humberger i");

  // Hamburger icon e click korle menu open hobe
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // Document click trigger hobe na
    hamDiv.classList.add("show2");
  });

  // Close button e click korle menu close hobe
  closeHamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // Event bubbling stop
    hamDiv.classList.remove("show2");
  });

  // Menu links e click korle menu close hobe
  let menuLinks = document.querySelectorAll(".AncherLink a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamDiv.classList.remove("show2");
    });
  });

  // Body/Document e click korle (hamburger menu er baire) close hobe
  document.addEventListener("click", (e) => {
    // Check: Click hamburger menu ba hamburger icon er baire hoyeche kina
    if (!hamDiv.contains(e.target) && !hamburger.contains(e.target)) {
      hamDiv.classList.remove("show2");
    }
  });
};
let slideBarFunctionality = () => {
  let index = 1;
  let autoSlideTimer;
  let direction = 1; // 1 for forward (next), -1 for backward (prev)

  let showSlide = (n) => {
    let i;
    let slides = document.querySelectorAll(".myslide");
    let dots = document.querySelectorAll(".dot");

    if (n > slides.length) {
      index = 1;
    }

    if (n < 1) {
      index = slides.length;
    }

    let currentActive = document.querySelector(".myslide[style *='block']");
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    let newslide = slides[index - 1];
    if (currentActive && currentActive !== newslide) {
      // Direction onujayi animation class use korbo
      if (direction === 1) {
        // Forward (Next button) - right to left
        currentActive.classList.add("slide-out");
        currentActive.classList.remove(
          "slide-in",
          "slide-in-reverse",
          "slide-out-reverse"
        );
      } else {
        // Backward (Prev button) - left to right
        currentActive.classList.add("slide-out-reverse");
        currentActive.classList.remove(
          "slide-in",
          "slide-in-reverse",
          "slide-out"
        );
      }

      setTimeout(() => {
        currentActive.style.display = "none";
        currentActive.classList.remove("slide-out", "slide-out-reverse");
      }, 600);
    }

    newslide.style.display = "block";
    // Direction onujayi animation class use korbo
    if (direction === 1) {
      // Forward (Next button) - right to left
      newslide.classList.add("slide-in");
      newslide.classList.remove(
        "slide-out",
        "slide-in-reverse",
        "slide-out-reverse"
      );
    } else {
      // Backward (Prev button) - left to right
      newslide.classList.add("slide-in-reverse");
      newslide.classList.remove("slide-out", "slide-in", "slide-out-reverse");
    }
    dots[index - 1].className += " active";
  };

  let startAutoSlide = () => {
    autoSlideTimer = setTimeout(() => {
      direction = 1; // Auto slide always forward
      index++;
      showSlide(index);
      startAutoSlide();
    }, 3000);
  };

  showSlide(index);
  startAutoSlide();
  let plusslide = (n) => {
    clearTimeout(autoSlideTimer);
    direction = n; // n will be 1 for next, -1 for prev
    showSlide((index += n));
    startAutoSlide();
  };

  let currslide = (n) => {
    clearTimeout(autoSlideTimer);
    direction = 1; // Dot click always forward
    showSlide((index = n));
    startAutoSlide();
  };

  let dot = document.querySelectorAll(".dot");
  for (let i = 0; i < dot.length; i++) {
    dot[i].addEventListener("click", () => {
      currslide(i + 1);
    });
  }
  document.querySelector(".next").addEventListener("click", () => {
    plusslide(1);
  });

  document.querySelector(".prev").addEventListener("click", () => {
    plusslide(-1);
  });
};

let menCollectionFunctionality = () => {
  let mensAll = document.querySelector(".mensAll");
  let innerhtml = "";
  menCard.forEach((item) => {
    innerhtml += `
    <div class="men-card">
          <img src=${item.Img} alt="">
          <div class="Sponsored">${item.sponsored}</div>
          <div class="companyName">${item.company}</div>
          <div class="productName">${item.productName}</div>
          <div class="prices">
            <span class="currentPrice">₹ ${item.currentPrice}</span>
            <span class="discountPrice">${item.distcountPrice}</span>
            <span class="discountRate"><i class="fa-solid fa-arrow-down"></i>${item.discountRte}%</span>
          </div>  
    </div>`;
  });

  mensAll.innerHTML = innerhtml;
};

let womenCollectionFunctionality = ()=>{
  let women = document.querySelector("#women");
  let innerhtml = '';
  womenCart.forEach((item) =>{
    innerhtml += `
    <div class="men-card">
          <img src=${item.Img} alt="">
          <div class="Sponsored">${item.sponsored}</div>
          <div class="companyName">${item.company}</div>
          <div class="productName">${item.productName}</div>
          <div class="prices">
            <span class="currentPrice">₹ ${item.currentPrice}</span>
            <span class="discountPrice">${item.distcountPrice}</span>
            <span class="discountRate"><i class="fa-solid fa-arrow-down"></i>${item.discountRte}%</span>
          </div>  
    </div>`;
  });
  women.innerHTML = innerhtml;
}

// Logout functionality - picture image e click korle menu dekhabe
let logoutFunctionality = () => {
  let profilePic = document.querySelector(".picture img");
  
  // Profile picture e right-click korle logout option
  profilePic.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    let confirmLogout = confirm("Do you want to logout?");
    if(confirmLogout){
      localStorage.removeItem("currentUser");
      profilePic.src = "new.jpg";
      alert("Logged out successfully! ✅");
    }
  });
};

// Smooth scroll functionality for navigation links
let smoothScrollFunctionality = () => {
  // Select all navigation links (both desktop and mobile)
  let navLinks = document.querySelectorAll('.nav a[href^="#"], .AncherLink a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      let targetId = link.getAttribute('href');
      let targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Smooth scroll to section
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close hamburger menu if open (mobile)
        let hamDiv = document.querySelector(".humberger");
        if (hamDiv) {
          hamDiv.classList.remove("show2");
        }
      }
    });
  });
};

uploadProfilePictureFunctionality();
womenCollectionFunctionality();
menCollectionFunctionality();
slideBarFunctionality();
hamBurgerFunctionality();
loginFunctinality();
signupFunctionality();
logoutFunctionality();
smoothScrollFunctionality();




