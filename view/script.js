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

    console.log("CHEGUEI NA FUNÇÃO SEND");

  const form = e.target;
  const inputs = form.querySelectorAll("input, textarea");

  // validação
  for (let i of inputs) {
    if (i.hasAttribute("required") && i.value.trim() === "") {
      alert("Preenche todos os campos!");
      return;
    }
  }

  const email = form.querySelector('input[type="email"]')?.value;
  if (!email || !email.includes("@")) {
    alert("Email inválido!");
    return;
  }

  const data = {
    nome: form.querySelector('[name="nome"]').value,
    email: form.querySelector('[name="email"]').value,
    servico: form.querySelector('[name="servico"]').value
  };

  try {
    const res = await fetch("https://fjbackend.onrender.com/enviar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

   const text = await res.text();

const msg = document.getElementById("msg");

if (res.ok) {
  if (msg) {
    msg.innerHTML = "✓ Pedido enviado com sucesso!";
    msg.style.display = "block";
    msg.style.color = "blue";
  }

  console.log(text);
  form.reset();

} else {
  if (msg) {
    msg.innerHTML = "✗ Erro ao enviar!";
    msg.style.display = "block";
    msg.style.color = "red";
  }

  console.log(text);
}
    form.reset();

  } catch (err) {
    console.error(err);
    alert("Erro ao enviar. Verifica o servidor.");
  }
}

// =========================
// FAQ (ACORDEÃO)
// =========================
document.querySelectorAll(".faq-pergunta").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach(i => {
      i.classList.remove("active");
    });

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// =========================
// ANO AUTOMÁTICO
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const ano = document.getElementById("ano");
  if (ano) ano.innerText = new Date().getFullYear();
});

// =========================
// REVEAL ANIMATION
// =========================
const observerReveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll(".reveal").forEach(el => {
  observerReveal.observe(el);
});

// =========================
// CONTADOR ANIMADO
// =========================
const observerNum = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);

      if (isNaN(target)) return;

      let current = 0;
      const increment = target / 60;
      const duration = 2000;
      const stepTime = duration / 60;

      const update = () => {
        current += increment;

        if (current < target) {
          el.textContent = Math.ceil(current);
          setTimeout(update, stepTime);
        } else {
          el.textContent = target;
        }
      };

      update();
      observerNum.unobserve(el);
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll("[data-target]").forEach(el => {
  observerNum.observe(el);
});

// =========================
// HEADER SCROLL EFFECT
// =========================
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (!header) return;

  if (window.scrollY > 80) {
    header.style.background = "rgba(255,255,255,0.95)";
    header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    header.style.background = "rgba(255,255,255,0.8)";
    header.style.boxShadow = "none";
  }
});

// =========================
// SERVIÇOS CLICK (atalho)
// =========================
document.querySelectorAll(".servico-card, .servico-giant").forEach(el => {
  el.addEventListener("click", () => {
    scrollToSection("fale-connosco");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", send);
  }
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

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
  });

  /* MOBILE TOUCH RESET */
  card.addEventListener('touchend', () => {
    card.style.transform = 'scale(1)';
  });
});