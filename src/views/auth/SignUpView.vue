<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
// import { NhostClient } from "@nhost/nhost-js";
import nhost from "@/nhost";

const displayName = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const router = useRouter();
const error = ref("");

async function signup() {
    console.log("singup");
    if (!validate()) return;

    console.log("user", email.value);
    console.log("password", password.value);

    // const nhost = new NhostClient({
    //     backendUrl: import.meta.env.VITE_NHOSTS_URL,
    // });

    const response = await nhost.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
            displayName: displayName.value,
        },
    });

    console.log("response", response);

    // Redirect to home
    // console.log("router", router)
    if (response.error) {
        error.value = response.error.message;
        return console.log("error", response.error);
    }

    // router.push('/');

    error.value =
        " Se ha enviado un correo de confirmación a tu cuenta de correo electrónico. Por favor, revisa tu bandeja de entrada.";
}

function validate() {
    // if (displayName.value.length < 3){
    //     error.value = "Display name must be at least 3 characters"
    //     return false
    // }
    // if (email.value.length < 3){
    //     error.value = "Email must be at least 3 characters"
    //     return false
    // }
    // if (password.value.length < 3){
    //     error.value = "Password must be at least 3 characters"
    //     return false
    // }
    // return true
    console.log(
        password.value !== passwordConfirm.value,
        password.value,
        "!==",
        passwordConfirm.value
    );

    if (password.value !== passwordConfirm.value) {
        error.value = "Passwords do not match";
        return false;
    }

    error.value = "";
    return true;
}
</script>

<template>
    <form id="signup" @submit.prevent="signup">
        <div class="title">
            <h1><RouterLink to="/login">🡠</RouterLink> Sign Up</h1>
        </div>

        <label for="email">name</label>
        <input
            id="displayName"
            name="displayName"
            type="text"
            v-model="displayName"
            required
        />
        <br />
        <label for="email">email</label>
        <input id="email" name="email" type="email" v-model="email" required />
        <br />
        <label for="password">password</label>
        <input
            id="password"
            name="password"
            type="password"
            v-model="password"
            required
            @change="validate"
        />
        <br />
        <label for="password">repeat password</label>
        <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="passwordConfirm"
            v-model="passwordConfirm"
            required
            @keyup="validate"
        />
        <br />
        <div v-if="error" class="error">
            {{ error }}
        </div>
        <br />
        <button type="submit">Sign Up</button>
    </form>
</template>

<style scoped>
form#signup {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 300px;
    margin: 0 auto;
}

.title {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 2rem;
}
.title a {
    text-decoration: none;
}

div label,
div input {
    width: 100%;
    height: 40px;
}

div button {
    height: 40px;
    width: 50%;
}
</style>
