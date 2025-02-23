document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-container.sign-in form");
    const inputName = document.querySelector(".form-container.sign-in input[type='name']");
    const inputPassword = document.querySelector(".form-container.sign-in input[type='password']");
    const loginButton = document.querySelector(".form-container.sign-in button");

    const correctPassword = "polku123";

    // Fungsi untuk memuat data users dari JSON file
    async function loadUsers() {
        try {
            const response = await fetch('default-users.json');
            if (!response.ok) throw new Error('Failed to load users data');
            return await response.json();
        } catch (error) {
            console.error('Error loading users:', error);
            showNotification("Gagal memuat data users!", true);
            return [];
        }
    }

    loginButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const username = inputName.value.trim();
        const password = inputPassword.value.trim();

        if (!username) {
            showNotification("Masukkan nama!", true);
            return;
        }

        if (!password) {
            showNotification("Masukkan Password!", true);
            return;
        }

        if (password !== correctPassword) {
            showNotification("Password salah!", true);
            return;
        }

        // Load users data from JSON file
        const users = await loadUsers();
        const user = users.find(u => u.name.toLowerCase() === username.toLowerCase());

        if (user) {
            // Simpan data user yang login ke sessionStorage (lebih aman dari localStorage)
            sessionStorage.setItem("username", user.name);
            sessionStorage.setItem("rank", user.rank);
            sessionStorage.setItem("division", user.division);

            Swal.fire({
                title: `Halo, ${user.name}!`,
                text: `Pangkat: ${user.rank}\nDivisi: ${user.division}`,
                icon: "success",
                confirmButtonText: "Lanjut"
            }).then(() => {
                showOptionsPopup();
            });
        } else {
            showNotification("Nama tidak ditemukan!", true);
        }
    });
});

// Fungsi untuk menampilkan pop-up pilihan
function showOptionsPopup() {
    let popup = document.querySelector(".options-popup");
    if (!popup) {
        popup = document.createElement("div");
        popup.className = "options-popup";
        popup.innerHTML = `
            <div class="popup-content">
                <h2>Pilih Halaman</h2>
                <div class="popup-buttons">
                    <button id="uudButton">ke UUD</button>
                    <button id="sopButton">ke SOP</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);

        document.getElementById("uudButton").addEventListener("click", () => {
            window.location.href = "undang.html";
        });

        document.getElementById("sopButton").addEventListener("click", () => {
            window.location.href = "sop.html";
        });
    }
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message, isError = false, callback = null) {
    let notification = document.querySelector(".notification");
    if (!notification) {
        notification = document.createElement("div");
        notification.className = "notification";
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.style.backgroundColor = isError ? "#ff4d4d" : "#4caf50";

    setTimeout(() => {
        notification.style.animation = "fadeOut 0.5s forwards";
        setTimeout(() => {
            notification.remove();
            if (callback) callback();
        }, 500);
    }, 3000);
}
