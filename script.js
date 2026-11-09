document.addEventListener('DOMContentLoaded', () => {
    const mainView = document.getElementById('main-view');
    const formView = document.getElementById('form-view');
    const qrisView = document.getElementById('qris-view');

    const btnOpenVip = document.getElementById('btn-open-vip');
    const btnBackToMain = document.getElementById('btn-back-to-main');
    const btnBackToForm = document.getElementById('btn-back-to-form');
    const vipForm = document.getElementById('vip-form');
    const btnFinish = document.getElementById('btn-finish');
    const displayNominal = document.getElementById('display-nominal');
    
    // Elemen Input Form (termasuk Discord Username)
    const inputNominal = document.getElementById('nominal');
    const inputNama = document.getElementById('nama');
    const inputEmail = document.getElementById('email');
    const inputWhatsapp = document.getElementById('whatsapp');
    const inputDiscord = document.getElementById('discord'); // Input Username Discord
    const qrisImageElement = document.querySelector('.qris-img');

    // Konfigurasi Brevo API Langsung dari Frontend
    const BREVO_API_KEY = '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'; 
    const TARGET_EMAIL = 'crescendelle@gmail.com';

    function switchView(targetView) {
        [mainView, formView, qrisView].forEach(view => view.classList.remove('active'));
        targetView.classList.add('active');
        const phoneScreen = document.querySelector('.phone-screen');
        if (phoneScreen) phoneScreen.scrollTop = 0;
        if (navigator.vibrate) navigator.vibrate(15);
    }

    // Efek getar halus untuk kartu link
    const cards = document.querySelectorAll('.link-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(15);
        });
    });

    if (btnOpenVip) btnOpenVip.addEventListener('click', () => switchView(formView));
    if (btnBackToMain) btnBackToMain.addEventListener('click', () => switchView(mainView));

    // Saat form disubmit -> Validasi, format nominal, dan tampilkan QRIS DANA
    if (vipForm) {
        vipForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nominalVal = inputNominal.value;
            const formattedNominal = new Intl.NumberFormat('id-ID', {
                style: 'currency', currency: 'IDR', maximumFractionDigits: 0
            }).format(nominalVal);

            if (displayNominal) displayNominal.innerText = formattedNominal;

            // Memuat gambar QRIS DANA statis milikmu
            if (qrisImageElement) {
                qrisImageElement.src = 'assets/qris.png'; // Pastikan path file gambar QRIS sesuai
            }

            switchView(qrisView);
        });
    }

    if (btnBackToForm) {
        btnBackToForm.addEventListener('click', () => switchView(formView));
    }

    // Tombol "Sudah Transfer" -> Kirim email mewah langsung via Brevo API
    if (btnFinish) {
        btnFinish.addEventListener('click', async () => {
            const nama = inputNama.value || 'Anonim';
            const email = inputEmail.value || '-';
            const whatsapp = inputWhatsapp.value || '-';
            const discord = inputDiscord ? inputDiscord.value || '-' : '-';
            const nominalFormatted = new Intl.NumberFormat('id-ID', {
                style: 'currency', currency: 'IDR', maximumFractionDigits: 0
            }).format(inputNominal.value);

            // Template HTML Email Super Mewah dengan Background Glow & Tempat Logo
            const luxuryEmailHtml = `
                <div style="background-color: #030712; padding: 50px 0; font-family: 'Segoe UI', Arial, sans-serif; color: #e4e4e7;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background: linear-gradient(135deg, #090d16 0%, #0f172a 50%, #030712 100%); border: 1px solid rgba(234, 88, 12, 0.3); border-radius: 20px; overflow: hidden; box-shadow: 0 0 40px rgba(234, 88, 12, 0.15), 0 25px 50px rgba(0, 0, 0, 0.8);">
                        
                        <!-- Header Banner dengan Area Logo & Glow -->
                        <tr>
                            <td style="padding: 45px 40px 30px; text-align: center; background: radial-gradient(circle at top, rgba(234, 88, 12, 0.25) 0%, transparent 75%); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                                
                                <!-- Lingkaran Tempat Logo Komunitas -->
                                <div style="width: 75px; height: 75px; border-radius: 50%; margin: 0 auto 18px; padding: 3px; background: linear-gradient(135deg, #ea580c, #f97316, #fb923c); box-shadow: 0 0 25px rgba(234, 88, 12, 0.5);">
                                    <img src="https://instagram.fbpn2-1.fna.fbcdn.net/v/t51.82787-19/893410661_17898733863680986_2712075169575904479_n.jpg?_nc_cat=106&_nc_map=urlgen_bucketless&ig_cache_key=GGVdQDXau9_5zZY-AN_kul7-OaMlbmNDAQAB0j-ccb7-5&ccb=7-5&_nc_sid=669407&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=6YMzOHn5UmEQ7kNvwGhpiea&_nc_oc=Adqn7lj1g-IN9SSwWbe8ZthMzODqW_rWgPdKShdM675_PjdYuza9g7_vl5vmOWamf4s&_nc_zt=24&_nc_ht=instagram.fbpn2-1.fna&_nc_gid=UDFqQfy29ftb41wrdcqwEw&_nc_ss=7daaf&oh=00_AQRn_7lCYS2OiC9g7yck-yLOFukzlxZgw8p5euxVmU8-kg&oe=6AF72D27" alt="Crescendelle Logo" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block; background-color: #090d16;">
                                </div>

                                <h1 style="color: #ffffff; margin: 0 0 6px 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase; font-weight: 800; text-shadow: 0 2px 10px rgba(234, 88, 12, 0.4);">Crescendelle Community</h1>
                                
                                <span style="display: inline-block; background: linear-gradient(135deg, rgba(234, 88, 12, 0.2), rgba(249, 115, 22, 0.2)); color: #fb923c; border: 1px solid rgba(234, 88, 12, 0.4); padding: 5px 14px; font-size: 11px; font-weight: 700; border-radius: 20px; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 5px;">
                                    VIP Supporter Transmission
                                </span>
                            </td>
                        </tr>

                        <!-- Content Body -->
                        <tr>
                            <td style="padding: 40px;">
                                <p style="font-size: 15px; color: #a1a1aa; margin-top: 0;">Halo <strong>Admin</strong>,</p>
                                <p style="font-size: 14px; color: #d4d4d8; line-height: 1.6;">Sistem mendeteksi adanya dukungan finansial VIP baru yang masuk melalui QRIS DANA. Berikut adalah rincian data pendukung:</p>
                                
                                <!-- Card Detail Box -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(234, 88, 12, 0.25); border-radius: 14px; margin: 25px 0; padding: 10px; box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.4);">
                                    <tr>
                                        <td style="padding: 12px 15px; color: #a1a1aa; font-size: 13px; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">Nama Lengkap</td>
                                        <td style="padding: 12px 15px; color: #ffffff; font-size: 14px; font-weight: 600; text-align: right; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">${nama}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 15px; color: #a1a1aa; font-size: 13px; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">Username Discord</td>
                                        <td style="padding: 12px 15px; color: #38bdf8; font-size: 14px; font-weight: 700; text-align: right; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">@${discord}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 15px; color: #a1a1aa; font-size: 13px; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">Email Kontak</td>
                                        <td style="padding: 12px 15px; color: #ffffff; font-size: 14px; font-weight: 600; text-align: right; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">${email}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 15px; color: #a1a1aa; font-size: 13px; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">Nomor WhatsApp</td>
                                        <td style="padding: 12px 15px; color: #ffffff; font-size: 14px; font-weight: 600; text-align: right; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">${whatsapp}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 15px; color: #fdba74; font-size: 14px; font-weight: 700;">Nominal Dukungan</td>
                                        <td style="padding: 15px; color: #fb923c; font-size: 18px; font-weight: 800; text-align: right;">${nominalFormatted}</td>
                                    </tr>
                                </table>

                                <div style="background: linear-gradient(135deg, rgba(234, 88, 12, 0.1), rgba(15, 23, 42, 0.5)); border-left: 4px solid #ea580c; border: 1px solid rgba(234, 88, 12, 0.2); padding: 15px; border-radius: 8px; margin-top: 25px;">
                                    <p style="font-size: 12px; color: #cbd5e1; line-height: 1.5; margin: 0; text-align: center;">
                                        ⚡ <strong>Tindakan Diperlukan:</strong> Cek mutasi pada aplikasi <strong>DANA Bisnis</strong> lalu berikan role VIP di server Discord untuk <strong>@${discord}</strong>.
                                    </p>
                                </div>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #030712; padding: 25px 30px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.06);">
                                <p style="color: #38bdf8; font-size: 13px; font-weight: 700; margin: 0 0 5px 0;">Crescendelle Community</p>
                                <p style="color: #64748b; font-size: 11px; margin: 0;">&copy; 2026 Crescendelle. Secured Infrastructure &bull; All rights reserved.</p>
                            </td>
                        </tr>
                    </table>
                </div>
            `;

            try {
                // Request langsung ke Brevo API v3 dari Frontend
                await fetch('https://api.brevo.com/v3/smtp/email', {
                    method: 'POST',
                    headers: {
                        'api-key': BREVO_API_KEY,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        sender: { name: "Crescendelle System", email: "crescendelle@gmail.com" }, // Pastikan email pengirim ini sudah verified di Brevo
                        to: [{ email: TARGET_EMAIL, name: "Zharvian" }],
                        subject: `🔔 Dukungan VIP Baru: @${discord} - ${nominalFormatted}`,
                        htmlContent: luxuryEmailHtml
                    })
                });
            } catch (err) {
                console.error('Gagal mengirim email via Brevo:', err);
            }

            alert('Terima kasih! Dukungan VIP kamu telah dicatat dan notifikasi telah dikirim.');
            vipForm.reset();
            switchView(mainView);
        });
    }
});