;(function () {
  //mobile menu
  const menu = document.querySelector(".header-menu")
  const burger = document.querySelector(".burger")

  if (burger) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("burger-active")
      menu.classList.toggle("menu-active")
    })

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        menu.classList.toggle("menu-active")
        burger.classList.toggle("burger-active")
      }
    })
  }

  // events slide
  const eventDates = document.querySelectorAll(".event-date")
  let eventDateIndex = 0

  function switchDate() {
    eventDates[eventDateIndex].classList.remove("event-date--active")
    eventDateIndex = (eventDateIndex + 1) % eventDates.length
    eventDates[eventDateIndex].classList.add("event-date--active")
  }

  setInterval(switchDate, 2400)

  //slider
  const slider = document.querySelector(".main-slider")
  const nextBtn = document.querySelector(".slider-btn.next")
  const prevBtn = document.querySelector(".slider-btn.prev")

  const scrollAmount = 300

  nextBtn.addEventListener("click", () => {
    slider.scrollBy({ left: scrollAmount, behavior: "smooth" })
  })

  prevBtn.addEventListener("click", () => {
    slider.scrollBy({ left: -scrollAmount, behavior: "smooth" })
  })

  //Fancybox
  Fancybox.bind("[data-fancybox]", {
    //instructions
  })

  //BMI counter
  const bmiCheck = document.querySelector("#bmiCheck")
  const bmiInfo = document.querySelector(".bmi-info")
  const bmiResult = document.querySelector(".bmi-result")

  bmiCheck.addEventListener("submit", (e) => {
    e.preventDefault()

    const bmiHeight =
      parseFloat(document.querySelector('input[name="height"]').value) / 100
    const bmiWeight = parseFloat(
      document.querySelector('input[name="weight"]').value,
    )

    if (!bmiHeight || !bmiWeight || bmiHeight <= 0 || bmiWeight <= 0) {
      bmiInfo.style.display = "block"
      bmiInfo.textContent = "Please enter valid height and weight!"
      return
    }

    const bmi = bmiWeight / bmiHeight ** 2

    bmiInfo.style.display = "block"
    bmiInfo.textContent = `Your BMI is: ${bmi.toFixed(2)}`
  })

  //promo video
  const video = document.querySelector("#promo-video")
  const playButton = document.querySelector(".video-btn")

  playButton.addEventListener("click", () => {
    if (video.paused) {
      video.play()
      playButton.textContent = "Pause"
      playButton.classList.add("hidden")
    } else {
      video.pause()
      playButton.textContent = "Play"
      playButton.classList.remove("hidden")
    }
  })

  // animated counters
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10)
    const duration = 1600
    const start = performance.now()

    function update(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = Math.floor(eased * target)
      if (progress < 1) requestAnimationFrame(update)
      else el.textContent = target
    }

    requestAnimationFrame(update)
  }

  const statsSection = document.querySelector(".stats")
  if (statsSection) {
    const counters = statsSection.querySelectorAll(".stats-count")
    let animated = false

    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          animated = true
          counters.forEach(animateCounter)
        }
      },
      { threshold: 0.4 }
    )
    statsObserver.observe(statsSection)
  }

  // scroll to top
  const scrollTopBtn = document.querySelector("#scrollTop")
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add("visible")
      } else {
        scrollTopBtn.classList.remove("visible")
      }
    })

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }
})()
