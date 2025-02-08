document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-container.sign-in form");
    const inputName = document.querySelector(".form-container.sign-in input[type='name']");
    const inputPassword = document.querySelector(".form-container.sign-in input[type='password']");
    const loginButton = document.querySelector(".form-container.sign-in button");

    // Database user (simulasi)
    const userData = [
        { name: "Iyan Antasari", rank: "Jenderal Polisi", division: "All" },
        { name: "Mariono Senopati", rank: "Komisaris Jenderal Polisi", division: "Brigade Mobil" },
        { name: "Mario Santa", rank: "Komisaris Jenderal Polisi", division: "Badan Reserse Kriminal" },
        { name: "Marcio Zelensky", rank: "Inspektur Jenderal Polisi", division: "Satuan Lalu Lintas" },
        { name: "Vincentzo Lacozta", rank: "Brigadir Jenderal Polisi", division: "Satuan Lalu Lintas" },
        { name: "Kora Syahputra", rank: "Sekretaris Jenderal Polisi", division: "Samapta Bhayangkara" },
        { name: "Bagas Ravendra", rank: "Ajun Komisaris Besar Polisi", division: "Samapta Bhayangkara" },
        { name: "Bonar Sitorus", rank: "Komisaris Polisi", division: "Samapta Bhayangkara" },
        { name: "Eko Sebastian", rank: "Komisaris Polisi", division: "Samapta Bhayangkara" },
        { name: "Bahar Kamarudin", rank: "Ajun Komisaris Polisi", division: "Samapta Bhayangkara" },
        { name: "Ardana Angkasa", rank: "Inspektur Polisi Satu", division: "Samapta Bhayangkara" },
        { name: "Allya Rebelions", rank: "Brigadir Polisi Dua", division: "Satuan Lalu Lintas" },
        { name: "Depvano Ravendra", rank: "Brigadir Polisi Dua", division: "Samapta Bhayangkara" },
        { name: "Ahsan Norseth", rank: "Brigadir Polisi", division: "Samapta Bhayangkara" },
        { name: "Binn Hook", rank: "Brigadir Polisi", division: "Satuan Lalu Lintas" },
        { name: "Oktoy Deadly", rank: "Brigadir Polisi", division: "Samapta Bhayangkara" },
        { name: "Tengku Khasyim", rank: "Brigadir Polisi Dua", division: "Samapta Bhayangkara" },
        { name: "Yanz Karl", rank: "Brigadir Polisi Dua", division: "Satuan Lalu Lintas" },
        { name: "Jeki Norseth", rank: "Anggota Brigadir Polisi", division: "Samapta Bhayangkara" },
        { name: "Emilio Vargas", rank: "Anggota Brigadir Polisi", division: "Satuan Lalu Lintas" },
        { name: "Jennie Cathlyn", rank: "Anggota Brigadir Polisi", division: "Samapta Bhayangkara" },
        { name: "Jater Bambang", rank: "Anggota Brigadir Polisi", division: "Satuan Lalu Lintas" },
        { name: "Chiro Ignatius", rank: "Anggota Brigadir Polisi", division: "Satuan Lalu Lintas" },
        { name: "Argan Rebellions", rank: "Anggota Brigadir Polisi", division: "Satuan Lalu Lintas" },
        { name: "Twyne Brown", rank: "Anggota Brigadir Polisi", division: "Satuan Lalu Lintas" },
        { name: "Goteng Warsed", rank: "Anggota Brigadir Polisi", division: "Samapta Bhayangkara" },
        { name: "Ubeed Ignacio", rank: "Anggota Brigadir Polisi", division: "Samapta Bhayangkara" },
        { name: "Shiro Vasquez", rank: "Anggota Brigadir Polisi", division: "Satuan Lalu Lintas" },
        { name: "Luther Einsberg", rank: "Ajun Brigadir Polisi", division: "Samapta Bhayangkara" },
        { name: "Kenny Bramasta", rank: "Ajun Brigadir Polisi", division: "Samapta Bhayangkara" },
    ];

    const correctPassword = "polku123";  // Password yang benar

    loginButton.addEventListener("click", (event) => {
        event.preventDefault(); // Mencegah submit form default

        const username = inputName.value.trim(); // Hapus spasi awal/akhir
        const password = inputPassword.value.trim();

        if (!username) {
            showNotification("Masukkan nama!", true);
            return;
        }

        if (!password) {
            showNotification("Masukkan Password!", true); // Pesan jika password kosong
            return;
        }

        if (password !== correctPassword) {
            showNotification("Password salah!", true);
            return;
        }

        // Cek apakah user ada di database
        const user = userData.find(u => u.name.toLowerCase() === username.toLowerCase());

        if (user) {
            // Simpan data user ke localStorage
            localStorage.setItem("username", user.name);
            localStorage.setItem("rank", user.rank);
            localStorage.setItem("division", user.division);

            // Tampilkan pop-up modern
            Swal.fire({
                title: `Halo, ${user.name}!`,
                text: `Pangkat: ${user.rank},\nDivisi: ${user.division}`,
                icon: "success",
                confirmButtonText: "Lanjut"
            }).then(() => {
                showOptionsPopup(); // Tampilkan pop-up pilihan
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
