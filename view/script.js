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

  window.scrollTo(0, window.scrollY);
  const form = e.target;
  const submitBtn = form.querySelector("button");
  const inputs = form.querySelectorAll("input, textarea");
  const msg = document.getElementById("msg");
if (!msg) return;

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

  const data = {
    nome: form.querySelector('[name="nome"]')?.value,
    email: form.querySelector('[name="email"]')?.value,
    servico: form.querySelector('[name="servico"]')?.value
  };

  try {
    const res = await fetch("https://fjbackend.onrender.com/enviar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const text = await res.text();
    console.log(text);

   if (msg) {
  msg.style.display = "block";
  msg.style.opacity = "1";

  // 👇 AQUI (coloca logo aqui)
  msg.scrollIntoView({ behavior: "smooth", block: "center" });
}

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
// REVEAL ANIMATION FIX
// =========================
const reveals = document.querySelectorAll(".reveal");

function showOnScroll() {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", showOnScroll);
window.addEventListener("load", showOnScroll);

// =========================
// COUNTERS ANIMAÇÃO
// =========================
function animateCounters() {
  const counters = document.querySelectorAll("[data-target]");

  counters.forEach(counter => {
    const target = Number(counter.getAttribute("data-target"));
    let current = 0;

    const speed = 2;

    const update = () => {
      current += speed;

      if (current < target) {
        counter.innerText = current;
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };

    update();
  });
}

// dispara quando DOM carregar
document.addEventListener("DOMContentLoaded", animateCounters);