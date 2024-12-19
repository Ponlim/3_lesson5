//phone block

const phoneInput = document.querySelector("#phone_input");
const phoneButton = document.querySelector("#phone_button");
const phoneResult = document.querySelector("#phone_result");
let tabIndex = 0

const regEx = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.onclick = () => {
  // alert('ok')
  if (regEx.test(phoneInput.value)) {
    phoneResult.innerHTML = "ok";
    phoneResult.style.color = "green";
  } else {
    phoneResult.innerHTML = "not ok";
    phoneResult.style.color = "red";
  }
};

//tab slider
const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabs = document.querySelectorAll(".tab_content_item");

const hideTabContent = () => {
  tabContentBlocks.forEach((item) => {
    item.style.display = "none";
  });
  tabs.forEach((item) => {
    item.classList.remove("tab_content_item_active");
  });
};

const showTabContent = (i = 0) => {
  tabContentBlocks[i].style.display = "block";
  tabs[i].classList.add("tab_content_item_active");
};


const switchTab = () => {
    hideTabContent()
    tabIndex = (tabIndex + 1) % tabs.length
    console.log(tabIndex)
    showTabContent(tabIndex)
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    hideTabContent();
    showTabContent(index);
  });
});

hideTabContent();
showTabContent();
// setInterval(switchTab, 2000)

let currentIndex = 0;
const autoSlide = () => {
  hideTabContent();
  currentIndex = (currentIndex + 1) % tabs.length;
  showTabContent(currentIndex);
};

setInterval(autoSlide, 3000);


/*-------CONVERTER--------*/

// const somInput = document.querySelector('#som')
// const usdInput = document.querySelector('#usd')

// const converter = (element, targetElement) => {
//   element.oninput = () => {
//     const request = new XMLHttpRequest()
//     request.open('GET', '../data/converter.json')
//     request.setRequestHeader('Content-type', 'application/json')
//     request.send()

//     request.onload = () => {
//       const data = JSON.parse(request.response)
//       if (element.id === 'som') targetElement.value = (element.value / data.usd).toFixed(2)
//       if (element.id === 'usd') targetElement.value = (element.value * data.usd).toFixed(2)
//       if (element.value === '') targetElement.value = ''
//     }
//   }
// }

// converter(somInput, usdInput)
// converter(usdInput, somInput)

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const converter = (element, targetElement1, targetElement2, data) => {
  element.oninput = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '../data/converter.json');
    request.setRequestHeader('Content-type', 'application/json');
    request.send();

    request.onload = () => {
      const data = JSON.parse(request.response);

      if (element.id === 'som') {
        targetElement1.value = (element.value / data.usd).toFixed(2);
        targetElement2.value = (element.value / data.eur).toFixed(2);
      }
      if (element.id === 'usd') {
        targetElement1.value = (element.value * data.usd).toFixed(2);
        targetElement2.value = (element.value * data.usd / data.eur).toFixed(2);
      }
      if (element.id === 'eur') {
        targetElement1.value = (element.value * data.eur).toFixed(2);
        targetElement2.value = (element.value * data.eur / data.usd).toFixed(2);
      }
      if (element.value === '') {
        targetElement1.value = '';
        targetElement2.value = '';
      }
    };
  };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);

// somInput.oninput = () => {
//   const request = new XMLHttpRequest()
//   request.open('GET', '../data/converter.json')
//   request.setRequestHeader('Content-type', 'application/json')
//   request.send()

//   request.onload = () => {
//     const data = JSON.parse(request.response)
//     usdInput.value = (somInput.value / data.usd).toFixed(2)
//   }
// }
// usdInput.oninput = () => {
//   const request = new XMLHttpRequest()
//   request.open('GET', '../data/converter.json')
//   request.setRequestHeader('Content-type', 'application/json')
//   request.send()

//   request.onload = () => {
//     const data = JSON.parse(request.response)
//     somInput.value = (usdInput.value * data.usd).toFixed(2)
//   }
// }

//dry
//kiss

