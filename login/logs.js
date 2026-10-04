
// ============================================
// LOGIN PAGE
// ============================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("errorMessage");

    const userBtn = document.getElementById("userBtn");
    const adminBtn = document.getElementById("adminBtn");

    const showPasswordButton =
        document.getElementById("showPassword");

    let selectedRole = "USER";


    // ========================================
    // USER / ADMIN SWITCH
    // ========================================

    userBtn.addEventListener("click", () => {

        selectedRole = "USER";

        userBtn.classList.add("active");
        adminBtn.classList.remove("active");

    });


    adminBtn.addEventListener("click", () => {

        selectedRole = "ADMIN";

        adminBtn.classList.add("active");
        userBtn.classList.remove("active");

    });


    // ========================================
    // SHOW / HIDE PASSWORD
    // ========================================

    showPasswordButton.addEventListener("click", () => {

        const isPassword =
            passwordInput.type === "password";


        passwordInput.type =
            isPassword ? "text" : "password";


        showPasswordButton.textContent =
            isPassword ? "Hide" : "Show";

    });


    // ========================================
    // LOGIN
    // ========================================

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        errorMessage.textContent = "";


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        // Basic validation

        if (!email || !password) {

            errorMessage.textContent =
                "Please enter email and password.";

            return;
        }


        try {

            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify({

                        email: email,

                        password: password,

                        role: selectedRole

                    })
                }
            );


            const data = await response.json();


            // Login failed

            if (!response.ok) {

                errorMessage.textContent =
                    data.message ||
                    "Invalid email or password.";

                return;
            }


            // Login successful

            if (data.role === "ADMIN") {

                window.location.href =
                    "admin-home.html";

            } else {

                window.location.href =
                    "home.html";
            }


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            errorMessage.textContent =
                "Unable to connect to server.";

        }

    });

}



// ============================================
// REGISTRATION PAGE
// ============================================

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    const nameInput =
        document.getElementById("name");

    const emailInput =
        document.getElementById("email");

    const passwordInput =
        document.getElementById("password");

    const confirmPasswordInput =
        document.getElementById("confirmPassword");

    const showPasswordButton =
        document.getElementById("showPassword");

    const showConfirmPasswordButton =
        document.getElementById("showConfirmPassword");

    const errorMessage =
        document.getElementById("errorMessage");


    // ========================================
    // SHOW / HIDE PASSWORD
    // ========================================

    showPasswordButton.addEventListener("click", () => {

        togglePassword(
            passwordInput,
            showPasswordButton
        );

    });


    showConfirmPasswordButton.addEventListener(
        "click",
        () => {

            togglePassword(
                confirmPasswordInput,
                showConfirmPasswordButton
            );

        }
    );


    // ========================================
    // REGISTRATION
    // ========================================

    registerForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            errorMessage.textContent = "";


            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;

            const confirmPassword =
                confirmPasswordInput.value;


            // ==================================
            // VALIDATION
            // ==================================

            if (!name || !email || !password ||
                !confirmPassword) {

                errorMessage.textContent =
                    "Please fill in all fields.";

                return;
            }


            if (password.length < 8) {

                errorMessage.textContent =
                    "Password must be at least 8 characters.";

                return;
            }


            if (password !== confirmPassword) {

                errorMessage.textContent =
                    "Passwords do not match.";

                return;
            }


            // ==================================
            // SEND TO BACKEND
            // ==================================

            try {

                const response = await fetch(
                    "http://localhost:8080/api/auth/register",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            name: name,

                            email: email,

                            password: password

                        })
                    }
                );


                const data =
                    await response.json();


                // Registration failed

                if (!response.ok) {

                    errorMessage.textContent =
                        data.message ||
                        "Registration failed.";

                    return;
                }


                // Registration successful

                alert(
                    "Account created successfully!"
                );


                window.location.href =
                    "index.html";


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


                errorMessage.textContent =
                    "Unable to connect to server.";

            }

        }
    );

}



// ============================================
// REUSABLE PASSWORD FUNCTION
// ============================================

function togglePassword(
    passwordInput,
    button
) {

    const isPassword =
        passwordInput.type === "password";


    passwordInput.type =
        isPassword ? "text" : "password";


    button.textContent =
        isPassword ? "Hide" : "Show";

}
