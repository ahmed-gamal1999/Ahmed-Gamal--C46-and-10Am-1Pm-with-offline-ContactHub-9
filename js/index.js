// ==================== All Input ===================
var contactFileInput = document.getElementById("contactFile");
var contactNameInput = document.getElementById("contactName");
var contactPhoneInput = document.getElementById("contactPhone");
var contactEmailInput = document.getElementById("contactEmail");
var contactAddressInput = document.getElementById("contactAddress");
var contactGroupSelectInput = document.getElementById("contactGroupSelect");
var contactNoteInput = document.getElementById("contactNote");
var contactFavoriteInput = document.getElementById("contactFavorite");
var contactEmergencyInput = document.getElementById("contactEmergency");

var searchInput = document.getElementById("searchInput");

// ==================== Buttons ===================
var cancelButton = document.getElementById("cancelButton");
var saveButton = document.getElementById("saveButton");
var updateButton = document.getElementById("updateButton");

// ============== No Contact Data Box ==============
var noContactData = document.getElementById("noContactData");

// ==================== Numbr of data ===================
var contactTotal = document.getElementById("contactTotal");
var contactTotalp = document.getElementById("contactTotalp");
var countFavoriteContact = document.getElementById("countFavoriteContact");
var countEmergencyContact = document.getElementById("countEmergencyContact");

// ==================== Modal ===================
var contactModalElement = document.getElementById("contactModal");
var contactModal = new bootstrap.Modal(contactModalElement);

// ==================== update contact variaple Global ===================
currentIndex = 0;

var contactList = [];

// ==================== Local Storage Check ===================
if (localStorage.getItem("contactContainer") !== null) {
  contactList = JSON.parse(localStorage.getItem("contactContainer"));
  displaydata();
}

// ==================== Create Contact ===================
function saveContact() {
  if (valaidationName() && valaidationNumber() && valaidationEmail()) {
    if (contactFileInput.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(contactFileInput.files[0]);
      reader.onload = function () {
        var contact = {
          Image: reader.result,
          name: contactNameInput.value,
          number: contactPhoneInput.value,
          email: contactEmailInput.value,
          address: contactAddressInput.value,
          select: contactGroupSelectInput.value,
          description: contactNoteInput.value,
          favoriteCheck: contactFavoriteInput.checked,
          emergencyCheck: contactEmergencyInput.checked,
        };
        var existingContact = contactList.find(
          (c) => c.number === contact.number
        );
        if (existingContact) {
          Swal.fire({
            icon: "error",
            title: "Duplicate Phone Number",
            text: `There is already a contact for this number named "${existingContact.name}"`,
          });
          return;
        }
        contactList.push(contact);
        localStorage.setItem("contactContainer", JSON.stringify(contactList));
        clearForm();
        closeContactModal();
        displaydata();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Added!",
          text: "Contact has been added successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      };
    } else {
      var contact = {
        Image: null,
        name: contactNameInput.value,
        number: contactPhoneInput.value,
        email: contactEmailInput.value,
        address: contactAddressInput.value,
        select: contactGroupSelectInput.value,
        description: contactNoteInput.value,
        favoriteCheck: contactFavoriteInput.checked,
        emergencyCheck: contactEmergencyInput.checked,
      };
      var existingContact = contactList.find(
        (c) => c.number === contact.number
      );
      if (existingContact) {
        Swal.fire({
          icon: "error",
          title: "Duplicate Phone Number",
          text: `There is already a contact for this number named "${existingContact.name}"`,
        });
        return;
      }
      contactList.push(contact);
      localStorage.setItem("contactContainer", JSON.stringify(contactList));
      clearForm();
      closeContactModal();
      displaydata();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Added!",
        text: "Contact has been added successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}

// ==================== Read Contact ===================
function displaydata() {
  var cartona = "";
  for (var i = 0; i < contactList.length; i++) {
    cartona += `<div class="col-12 col-md-6">
<div class="col">
<div class="card box-contact mb-3" style="max-width: 30rem">
<div class="card-header card-left-box gap-2">
<div class="d-flex gap-2 pt-2">
<div class="box-name-contact d-flex me-2 justify-content-center position-relative">
  ${
    contactList[i].favoriteCheck
      ? `<i class="fa-solid fa-star starChangePosation"></i>`
      : ""
  }
  ${
    contactList[i].emergencyCheck
      ? `<i class="fa-solid fa-heart-pulse emergencyChangePosation"></i>`
      : ""
  }<div class="box-contact-img d-flex justify-content-center align-items-center position-relative">
${
  contactList[i].Image
    ? `<img src="${contactList[i].Image}" alt="contact image" class="contact-img rounded-circle">`
    : `<h5 class="m-0 align-self-center">${getInitials(
        contactList[i].name
      )}</h5>`
}</div>
</div>
<div class="box-name-content">
<h6 class="m-0">${contactList[i].name}</h6>
<div class="number-contact-box d-flex mt-1 gap-2">
<i class="fa-solid fa-phone"></i>
<p class="m-0">${contactList[i].number}</p>
</div>
</div>
</div>
${
  contactList[i].email
    ? `<div class="email-contact-box d-flex pt-3 gap-2 header-box-content-down">
        <i class="fa-solid fa-envelope align-self-center email-style"></i>
        <p class="m-0">${contactList[i].email}</p>
     </div>`
    : ""
}
${
  contactList[i].address
    ? `<div class="email-contact-box d-flex pt-3 gap-2 header-box-content-down">
        <i class="fa-solid fa-location-dot align-self-center email-style"></i>
        <p class="m-0">${contactList[i].address}</p>
     </div>`
    : ""
}
<div class="d-flex gap-2 mt-2 mb-2 badge-box-data">
  ${
    contactList[i].select
      ? `<span class="span-one">${contactList[i].select}</span>`
      : ""
  }
  ${
    contactList[i].emergencyCheck
      ? `<span class="span-tow">
           <i class="fa-solid fa-heart-pulse"></i> Emergency
         </span>`
      : ""
  }
</div>
</div>
<div class="card-body">
<div class="contact-footer d-flex justify-content-between">
<div class="left-contactfooter d-flex gap-1">
<a href="tel:${
      contactList[i].number
    }"><i class="fa-solid fa-phone text-center icon-call"></i></a>
            ${
              contactList[i].email
                ? `<a href="mailto:${contactList[i].email}">
         <i class="fa-solid fa-envelope text-center icon-message"></i>
       </a>`
                : ""
            }
</div>
<div class="right-contactfooter d-flex gap-1">
<i onclick="toggleFavorite(${i}, this)"class="${
      contactList[i].favoriteCheck ? "fa-solid star-active" : "fa-regular"
    } fa-star text-center icon-star"></i>
<i onclick="toggleEmergency(${i}, this)" class="${
      contactList[i].emergencyCheck
        ? "fa-solid fa-heart-pulse heart-active"
        : "fa-regular fa-heart "
    } text-center"></i>
<i class="fa-solid fa-pencil text-center icon-pencil" onclick="setUbdateContact(${i})"></i>
<i class="fa-solid fa-trash text-center icon-delete" onclick="deleteContact(${i})" id="iconDelete" ></i>
</div>
</div>
</div>
</div>
</div>
</div>`;
  }
  document.getElementById("boxData").innerHTML = cartona;
  contactTotal.innerHTML = contactList.length;
  contactTotalp.innerHTML = contactList.length;
  checkedFavoriteBox();
  checkedEmergencyBox();
  if (contactList.length == 0) {
    noContactData.classList.remove("d-none");
  } else {
    noContactData.classList.add("d-none");
  }
}

// ==================== Add To Favorite Box ===================
function checkedFavoriteBox() {
  var cartona = "";
  var count = 0;
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].favoriteCheck == true) {
      count++;
      cartona += `<div
                  class="d-flex justify-content-between rounded-2 favorite-box"
                >
                  <div class="gap-4 d-flex">
                    <div class="align-content-center">
                      <h6 class="m-0 icon-contact">${getInitials(
                        contactList[i].name
                      )}</h6>
                    </div>
                    <div class="flex-column change-style-box">
                      <h5 class="m-0 change-style-box fw-bold">${
                        contactList[i].name
                      }</h5>
                      <p class="m-0 change-style-box">${
                        contactList[i].number
                      }</p>
                    </div>
                  </div>
                  <div class="align-content-center">
<a href="tel:${
        contactList[i].number
      }"><i class="fa-solid fa-phone icon-call-fav align-content-center"></i></a>
                  </div>
                </div>`;
    }
  }
  countFavoriteContact.innerHTML = count;
  if (count === 0) {
    cartona = `<p class="card-text text-center p-4">No favorite contacts</p>`;
  }
  document.getElementById("favoritesBox").innerHTML = cartona;
}

// ==================== Add To Emergency Box ===================
function checkedEmergencyBox() {
  var cartona = "";
  var count = 0;
  for (var i = 0; i < contactList.length; i++) {
    if (contactList[i].emergencyCheck == true) {
      count++;
      cartona += `<div
                  class="d-flex justify-content-between rounded-2 favorite-box"
                >
                  <div class="gap-4 d-flex">
                    <div class="align-content-center">
                      <h6 class="m-0 icon-contact">${getInitials(
                        contactList[i].name
                      )}</h6>
                    </div>
                    <div class="flex-column change-style-box">
                      <h5 class="m-0 change-style-box fw-bold">${
                        contactList[i].name
                      }</h5>
                      <p class="m-0 change-style-box">${
                        contactList[i].number
                      }</p>
                    </div>
                  </div>
                  <div class="align-content-center">
<a href="tel:${
        contactList[i].number
      }"><i class="fa-solid fa-phone icon-call-fav align-content-center"></i></a>
                  </div>
                </div>`;
    }
  }
  countEmergencyContact.innerHTML = count;
  if (count === 0) {
    cartona = `<p class="card-text text-center p-4">No emergency contacts</p>`;
  }
  document.getElementById("emergencyBox").innerHTML = cartona;
}

// ==================== Delete Contact ===================
function deleteContact(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contactList[index].name}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#606773",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      contactList.splice(index, 1);
      localStorage.setItem("contactContainer", JSON.stringify(contactList));
      displaydata();
      Swal.fire({
        title: "Deleted!",
        text: "The contact has been deleted.",
        icon: "success",
      });
    }
  });
}

// ==================== Search In Contacts ===================
function searchContact() {
  var term = searchInput.value.toLowerCase();
  var cartona = "";
  var found = false;
  for (var i = 0; i < contactList.length; i++) {
    if (
      contactList[i].name.toLowerCase().includes(term) ||
      contactList[i].number.includes(term) ||
      (contactList[i].email &&
        contactList[i].email.toLowerCase().includes(term))
    ) {
      found = true;
      cartona += `<div class="col-12 col-md-6">
<div class="col">
<div class="card box-contact mb-3" style="max-width: 30rem">
<div class="card-header card-left-box gap-2">
<div class="d-flex gap-2 pt-2">
<div class="box-name-contact d-flex me-2 justify-content-center position-relative">
  ${
    contactList[i].favoriteCheck
      ? `<i class="fa-solid fa-star starChangePosation"></i>`
      : ""
  }
  ${
    contactList[i].emergencyCheck
      ? `<i class="fa-solid fa-heart-pulse emergencyChangePosation"></i>`
      : ""
  }
<div class="box-contact-img d-flex justify-content-center align-items-center position-relative">
${
  contactList[i].Image
    ? `<img src="${contactList[i].Image}" alt="contact image" class="contact-img rounded-circle">`
    : `<h5 class="m-0 align-self-center">${getInitials(
        contactList[i].name
      )}</h5>`
}
</div>
</div>
<div class="box-name-content">
<h6 class="m-0">${contactList[i].name}</h6>
<div class="number-contact-box d-flex mt-1 gap-2">
<i class="fa-solid fa-phone"></i>
<p class="m-0">${contactList[i].number}</p>
</div>
</div>
</div>
${
  contactList[i].email
    ? `<div class="email-contact-box d-flex pt-3 gap-2 header-box-content-down">
        <i class="fa-solid fa-envelope align-self-center email-style"></i>
        <p class="m-0">${contactList[i].email}</p>
     </div>`
    : ""
}
${
  contactList[i].address
    ? `<div class="email-contact-box d-flex pt-3 gap-2 header-box-content-down">
        <i class="fa-solid fa-location-dot align-self-center email-style"></i>
        <p class="m-0">${contactList[i].address}</p>
     </div>`
    : ""
}
<div class="d-flex gap-2 mt-2 mb-2 badge-box-data">
  ${
    contactList[i].select
      ? `<span class="span-one">${contactList[i].select}</span>`
      : ""
  }
  ${
    contactList[i].emergencyCheck
      ? `<span class="span-tow">
           <i class="fa-solid fa-heart-pulse"></i> Emergency
         </span>`
      : ""
  }
</div>
</div>
<div class="card-body">
<div class="contact-footer d-flex justify-content-between">
<div class="left-contactfooter d-flex gap-1">
<a href="tel:${
        contactList[i].number
      }"><i class="fa-solid fa-phone text-center icon-call"></i></a>${
        contactList[i].email
          ? `<a href="mailto:${contactList[i].email}">
         <i class="fa-solid fa-envelope text-center icon-message"></i>
       </a>`
          : ""
      }</div>
<div class="right-contactfooter d-flex gap-1">
<i onclick="toggleFavorite(${i}, this)"class="${
        contactList[i].favoriteCheck ? "fa-solid star-active" : "fa-regular"
      } fa-star text-center icon-star"></i>
<i onclick="toggleEmergency(${i}, this)" class="${
        contactList[i].emergencyCheck
          ? "fa-solid fa-heart-pulse heart-active"
          : "fa-regular fa-heart "
      } text-center"></i>
<i class="fa-solid fa-pencil text-center icon-pencil" onclick="setUbdateContact(${i})"></i>
<i class="fa-solid fa-trash text-center icon-delete" onclick="deleteContact(${i})" id="iconDelete" ></i>
</div>
</div>
</div>
</div>
</div>
</div>`;
      noContactData.classList.add("d-none");
    }
  }
  if (found) {
    noContactData.classList.add("d-none");
  } else {
    noContactData.classList.remove("d-none");
  }
  document.getElementById("boxData").innerHTML = cartona;
  checkedEmergencyBox();
}

// ==================== Set Ubdate Contact To Inpots ===================
function setUbdateContact(index) {
  contactModal.show();
  // contactFileInput.value = contactList[index].Image;
  contactNameInput.value = contactList[index].name;
  contactPhoneInput.value = contactList[index].number;
  contactEmailInput.value = contactList[index].email;
  contactAddressInput.value = contactList[index].address;
  contactGroupSelectInput.value = contactList[index].select;
  contactNoteInput.value = contactList[index].description;
  contactFavoriteInput.checked = contactList[index].favoriteCheck;
  contactEmergencyInput.checked = contactList[index].emergencyCheck;
  saveButton.classList.add("d-none");
  updateButton.classList.remove("d-none");
  currentIndex = index;
}

// ==================== Ubdate Contact ===================
function ubdateContact() {
  if (
    valaidationName() == true &&
    valaidationNumber() == true &&
    valaidationEmail() == true
  ) {
    if (contactFileInput.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(contactFileInput.files[0]);
      reader.onload = function () {
        var contact = {
          Image: reader.result,
          name: contactNameInput.value,
          number: contactPhoneInput.value,
          email: contactEmailInput.value,
          address: contactAddressInput.value,
          select: contactGroupSelectInput.value,
          description: contactNoteInput.value,
          favoriteCheck: contactFavoriteInput.checked,
          emergencyCheck: contactEmergencyInput.checked,
        };
        saveButton.classList.remove("d-none");
        updateButton.classList.add("d-none");
        contactList.splice(currentIndex, 1, contact);
        localStorage.setItem("contactContainer", JSON.stringify(contactList));
        displaydata();
        closeContactModal();
        clearForm();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Updated!",
          text: `Contact has been updated successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });
      };
    } else {
      var contact = {
        Image: contactList[currentIndex].Image || null,
        name: contactNameInput.value,
        number: contactPhoneInput.value,
        email: contactEmailInput.value,
        address: contactAddressInput.value,
        select: contactGroupSelectInput.value,
        description: contactNoteInput.value,
        favoriteCheck: contactFavoriteInput.checked,
        emergencyCheck: contactEmergencyInput.checked,
      };
      saveButton.classList.remove("d-none");
      updateButton.classList.add("d-none");
      contactList.splice(currentIndex, 1, contact);
      localStorage.setItem("contactContainer", JSON.stringify(contactList));
      displaydata();
      closeContactModal();
      clearForm();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Updated!",
        text: `Contact has been updated successfully.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}

// ==================== Open Modal Function ===================
function openContactModal() {
  contactModal.show();
}

// ==================== Close Modal Function ===================
function closeContactModal() {
  contactModal.hide();
  clearForm();
}

// ==================== Set Valedation Name ===================
function valaidationName() {
  var regex = /^[a-zA-Z][a-zA-Z0-9 ]{2,20}$/;
  var text = contactNameInput.value;
  if (regex.test(text)) {
    contactNameInput.classList.add("is-valid");
    contactNameInput.classList.remove("is-invalid");
    document.getElementById("validName").classList.add("d-none");
    return true;
  } else {
    contactNameInput.classList.add("is-invalid");
    contactNameInput.classList.remove("is-valid");
    document.getElementById("validName").classList.remove("d-none");
    return false;
  }
}

// ==================== Set Valedation Number ===================
function valaidationNumber() {
  var regex = /^01[0-25][0-9]{8}$/;
  var phoneNumber = contactPhoneInput.value;
  if (regex.test(phoneNumber)) {
    contactPhoneInput.classList.add("is-valid");
    contactPhoneInput.classList.remove("is-invalid");
    document.getElementById("validNumber").classList.add("d-none");
    return true;
  } else {
    contactPhoneInput.classList.add("is-invalid");
    contactPhoneInput.classList.remove("is-valid");
    document.getElementById("validNumber").classList.remove("d-none");
    return false;
  }
}

// ==================== Set Valedation Email ===================
function valaidationEmail() {
  var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var email = contactEmailInput.value.trim();
  if (email === "") {
    contactEmailInput.classList.remove("is-invalid");
    contactEmailInput.classList.remove("is-valid");
    document.getElementById("validEmail").classList.add("d-none");
    return true;
  } else if (regex.test(email)) {
    contactEmailInput.classList.add("is-valid");
    contactEmailInput.classList.remove("is-invalid");
    document.getElementById("validEmail").classList.add("d-none");
    return true;
  } else {
    contactEmailInput.classList.add("is-invalid");
    contactEmailInput.classList.remove("is-valid");
    document.getElementById("validEmail").classList.remove("d-none");
    return false;
  }
}

// ==================== Clear All Inputs ===================
function clearForm() {
  contactFileInput.value = null;
  contactNameInput.value = null;
  contactPhoneInput.value = null;
  contactAddressInput.value = null;
  contactEmailInput.value = null;
  contactGroupSelectInput.value = "";
  contactNoteInput.value = null;
  contactFavoriteInput.checked = false;
  contactEmergencyInput.checked = false;

  contactFileInput.classList.remove("is-valid", "is-invalid");
  contactNameInput.classList.remove("is-valid", "is-invalid");
  contactPhoneInput.classList.remove("is-valid", "is-invalid");
  contactAddressInput.classList.remove("is-valid", "is-invalid");
  contactEmailInput.classList.remove("is-valid", "is-invalid");
  contactGroupSelectInput.classList.remove("is-valid", "is-invalid");
  contactNoteInput.classList.remove("is-valid", "is-invalid");
  contactFavoriteInput.classList.remove("is-valid", "is-invalid");
  contactEmergencyInput.classList.remove("is-valid", "is-invalid");

  validName.classList.add("d-none");
  validNumber.classList.add("d-none");
  validEmail.classList.add("d-none");
}

// ==================== Favorite Toggle ===================
function toggleFavorite(index) {
  contactList[index].favoriteCheck = !contactList[index].favoriteCheck;
  localStorage.setItem("contactContainer", JSON.stringify(contactList));
  displaydata();
}

// ==================== Emergency Toggle ===================
function toggleEmergency(index) {
  contactList[index].emergencyCheck = !contactList[index].emergencyCheck;
  localStorage.setItem("contactContainer", JSON.stringify(contactList));
  displaydata();
}

// ==================== Get the first letter  ===================
function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase())
    .join("");
}

// ==================== Modal Cancel Buttun  ===================
function cancelButtonModal() {
  clearForm();
}
