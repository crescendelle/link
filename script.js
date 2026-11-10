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
    
    // Elemen Input Form
    const inputNominal = document.getElementById('nominal');
    const inputNama = document.getElementById('nama');
    const inputEmail = document.getElementById('email');
    const inputWhatsapp = document.getElementById('whatsapp');
    const inputDiscord = document.getElementById('discord');
    const qrisImageElement = document.querySelector('.qris-img');

    // KONFIGURASI EMAILJS
    const EMAILJS_SERVICE_ID = 'service_n17r016';   
    const EMAILJS_TEMPLATE_ID = 'template_arlmz0g';

    function switchView(targetView) {
        [mainView, formView, qrisView].forEach(view => view.classList.remove('active'));
        targetView.classList.add('active');
        const phoneScreen = document.querySelector('.phone-screen');
        if (phoneScreen) phoneScreen.scrollTop = 0;
        if (navigator.vibrate) navigator.vibrate(15);
    }

    const cards = document.querySelectorAll('.link-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (navigator.vibrate) navigator.vibrate(15);
        });
    });

    if (btnOpenVip) btnOpenVip.addEventListener('click', () => switchView(formView));
    if (btnBackToMain) btnBackToMain.addEventListener('click', () => switchView(mainView));

    if (vipForm) {
        vipForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nominalVal = inputNominal.value;
            const formattedNominal = new Intl.NumberFormat('id-ID', {
                style: 'currency', currency: 'IDR', maximumFractionDigits: 0
            }).format(nominalVal);

            if (displayNominal) displayNominal.innerText = formattedNominal;

            if (qrisImageElement) {
                qrisImageElement.src = 'assets/qris.png';
            }

            switchView(qrisView);
        });
    }

    if (btnBackToForm) {
        btnBackToForm.addEventListener('click', () => switchView(formView));
    }

    // Tombol "Sudah Transfer" -> Kirim data via EmailJS aman
    if (btnFinish) {
        btnFinish.addEventListener('click', async () => {
            const nama = inputNama.value || 'Anonim';
            const email = inputEmail.value || '-';
            const whatsapp = inputWhatsapp.value || '-';
            const discord = inputDiscord ? inputDiscord.value || '-' : '-';
            const nominalFormatted = new Intl.NumberFormat('id-ID', {
                style: 'currency', currency: 'IDR', maximumFractionDigits: 0
            }).format(inputNominal.value);

            // Data parameter yang dikirim ke Template EmailJS
            const templateParams = {
                to_name: 'Admin Crescendelle',
                nama: nama,
                discord: discord,
                email: email,
                whatsapp: whatsapp,
                nominal: nominalFormatted
            };

            try {
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
            } catch (err) {
                console.error('Gagal mengirim email via EmailJS:', err);
            }

            alert('Terima kasih! Dukungan VIP kamu telah dicatat dan notifikasi telah dikirim.');
            vipForm.reset();
            switchView(mainView);
        });
    }
});
