document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-container.sign-in form");
    const inputPassword = document.querySelector(".form-container.sign-in input[type='password']");
    const loginButton = document.querySelector(".form-container.sign-in button");

    // Password yang benar
    const correctPassword = "wapi";

    // Event listener untuk tombol login
    loginButton.addEventListener("click", (event) => {
        event.preventDefault(); // Mencegah submit form default

        // Validasi password
        if (inputPassword.value === correctPassword) {
            showNotification("Kamu telah berhasil login!");
            setTimeout(() => {
                // Arahkan ke tampilan baru (misalnya ke "undang.html")
                window.location.href = "undang.html";
            }, 2000); // Tunggu 2 detik sebelum mengarahkan
        } else {
            showNotification("Password salah. Coba lagi!", true);
        }
    });

    // Fungsi untuk menampilkan notifikasi
    function showNotification(message, isError = false) {
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
            }, 500);
        }, 3000); // Hilangkan setelah 3 detik
    }
});

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