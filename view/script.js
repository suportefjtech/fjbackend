// =========================
// SCROLL SUAVE
// =========================
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// =========================
// FORM SUBMIT
// =========================
async function send(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector("button");
  const msg = document.getElementById("msg");
  const inputs = form.querySelectorAll("input, textarea");

  // validação
  for (let i of inputs) {
    if (i.hasAttribute("required") && i.value.trim() === "") {
      alert("Preenche todos os campos!");
      return;
    }
  }

  // bloqueia botão
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = "A enviar...";
  }

  // dados
  const data = {
    nome: form.querySelector('[name="nome"]').value,
    email: form.querySelector('[name="email"]').value,
    servico: form.querySelector('[name="servico"]').value
  };

  try {
    const res = await fetch("https://fjbackend.onrender.com/enviar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const text = await res.text();

    if (msg) msg.style.display = "block";

    if (res.ok) {
      if (msg) {
        msg.innerHTML = "✓ Pedido enviado com sucesso!";
        msg.style.color = "blue";
      }
      form.reset();
    } else {
      if (msg) {
        msg.innerHTML = "✗ Erro ao enviar!";
        msg.style.color = "red";
      }
    }

    console.log(text);

  } catch (err) {
    console.error(err);
    alert("Erro ao enviar. Verifica o servidor.");
  }

  // desbloqueia botão
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerText = "Enviar";
  }
}

// =========================
// FAQ
// =========================
document.querySelectorAll(".faq-pergunta").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach(i => {
      i.classList.remove("active");
    });

    if (!isActive) item.classList.add("active");
  });
});

// =========================
// INIT GERAL
// =========================
document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("form");
  if (form) form.addEventListener("submit", send);

  const ano = document.getElementById("ano");
  if (ano) ano.innerText = new Date().getFullYear();

  document.querySelectorAll(".servico-card, .servico-giant").forEach(el => {
    el.addEventListener("click", () => {
      scrollToSection("fale-connosco");
    });
  });

  document.querySelectorAll('.atuamos-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.atuamos-card')
        .forEach(c => c.classList.remove('active'));

      card.classList.add('active');
    });
  });

  const cards = document.querySelectorAll('.portfolio-item');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (x - centerX) / 10;

      card.style.transform =
        `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
    });

    card.addEventListener('touchend', () => {
      card.style.transform = 'scale(1)';
    });
  });

});