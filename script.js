document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-container.sign-in form");
    const inputName = document.querySelector(".form-container.sign-in input[type='name']");
    const inputPassword = document.querySelector(".form-container.sign-in input[type='password']");
    const loginButton = document.querySelector(".form-container.sign-in button");

    const correctPassword = "polku123";

    loginButton.addEventListener("click", (event) => {
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

        // Ambil data user dari localStorage
        const users = JSON.parse(localStorage.getItem('userData') || '[]');
        const user = users.find(u => u.name.toLowerCase() === username.toLowerCase());

        if (user) {
            // Simpan data user yang login
            localStorage.setItem("username", user.name);
            localStorage.setItem("rank", user.rank);
            localStorage.setItem("division", user.division);

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
    // Cek apakah elemen pop-up sudah ada
    let popup = document.querySelector(".options-popup");
    if (!popup) {
        // Buat elemen pop-up baru
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

        // Tambahkan event listener ke tombol
        document.getElementById("uudButton").addEventListener("click", () => {
            window.location.href = "undang.html"; // Ganti ke halaman undang.html
        });

        document.getElementById("sopButton").addEventListener("click", () => {
            window.location.href = "sop.html"; // Ganti ke halaman sop.html
        });
    }
}

    // Fungsi untuk menampilkan notifikasi
    function showNotification(message, isError = false, callback = null) {
        // Cek apakah elemen notifikasi sudah ada
        let notification = document.querySelector(".notification");
        if (!notification) {
            // Buat elemen notifikasi baru
            notification = document.createElement("div");
            notification.className = "notification";
            document.body.appendChild(notification); // Menambahkan di body
        }

        // Tambahkan pesan dan styling
        notification.textContent = message;
        notification.style.backgroundColor = isError ? "#ff4d4d" : "#4caf50";

        // Hilangkan notifikasi setelah beberapa saat
        setTimeout(() => {
            notification.style.animation = "fadeOut 0.5s forwards"; // Tambahkan animasi keluar
            setTimeout(() => {
                notification.remove(); // Hapus notifikasi setelah animasi selesai
                if (callback) callback(); // Panggil callback jika ada
            }, 500);
        }, 3000); // Hilangkan setelah 3 detik
    }

document.getElementById("submit").addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".checkbox:checked");
    const summaryTable = document.getElementById("summary-table");
    const tbody = summaryTable.querySelector("tbody");
    let totalDenda = 0;
    let totalPenjara = 0;

    // Reset table body
    tbody.innerHTML = "";

    checkboxes.forEach((checkbox) => {
        const uu = checkbox.dataset.uu;
        const tindak = checkbox.closest("tr").children[2].textContent;
        const denda = parseInt(checkbox.dataset.denda);
        const penjara = isNaN(parseInt(checkbox.dataset.penjara))
            ? 0
            : parseInt(checkbox.dataset.penjara);

        totalDenda += denda;
        totalPenjara += penjara;

        // Tambahkan baris ke tabel ringkasan
        const row = `<tr>
            <td>${uu}</td>
            <td>${tindak}</td>
            <td>${denda}</td>
            <td>${penjara}</td>
        </tr>`;
        tbody.insertAdjacentHTML("beforeend", row);
    });

    // Update total
    document.getElementById("total-denda").textContent = totalDenda;
    document.getElementById("total-penjara").textContent = totalPenjara;

    // Tampilkan tabel ringkasan
    summaryTable.style.display = "table";
});
