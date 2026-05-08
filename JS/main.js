//^ Main Variables

var contacts = document.getElementById("contacts");
var totalNum = document.getElementById("totalNum");
var favoriteNum = document.getElementById("favoriteNum");
var emergencyNum = document.getElementById("emergencyNum");
var totalContacts = document.getElementById("totalContacts");
var searchInput = document.getElementById("searchInput");
var xMarkClearSearchInput = document.getElementById("xMarkClearSearchInput");
var addContactBtn = document.getElementById("addContactBtn");
var customModal = document.getElementById("customModal");
var contactImageInput = document.getElementById("contactImage");
var fullNameInput = document.getElementById("fullName");
var phoneNumberInput = document.getElementById("phoneNumber");
var emailAddressInput = document.getElementById("emailAddress");
var addressInput = document.getElementById("address");
var groupInput = document.getElementById("group");
var notesInput = document.getElementById("notes");
var favoriteCheckBox = document.getElementById("favoriteCheckBox");
var emergencyCheckBox = document.getElementById("emergencyCheckBox");
var addBtn = document.getElementById("addContact");
var updateBtn = document.getElementById("updateContact");
var favoriteContentList = document.getElementById("favoriteList");
var emergencyContentList = document.getElementById("emergencyList");
var clearAllBtn = document.getElementById("clearAllBtn");
var starImage = document.getElementById("starImage");
var heartImage = document.getElementById("heartImage");
var userIcon = document.querySelector(".userIcon i");
var previewImg = document.querySelector(".userIcon img");

//& End Main Variabes

//~ Main Functions

//? Create Contact List To Store Contacts
var contactsList = JSON.parse(localStorage.getItem("contactList")) || [];

//? Show Data Was Stored When Opening The Website
restoreAndShow();

//^ Add Contact Function
function addContact() {
  //? Create Object For New Contact
  var contact = {
    image: `./Assets/Images/${contactImageInput.files[0]?.name}`,
    fullName: fullNameInput.value,
    phoneNumber: phoneNumberInput.value,
    email: emailAddressInput.value,
    address: addressInput.value,
    group: groupInput.value,
    notes: notesInput.value,
    isFavorite: favoriteCheckBox.checked,
    isEmergency: emergencyCheckBox.checked,
  };

  //? Apply All Validation Functions
  if (!requireInputsValidation()) {
    return;
  }

  if (!validateAllFields()) {
    return;
  }

  //? Add New Contact To The List
  contactsList.push(contact);

  //? Store New Contact In The Storage And Display It
  restoreAndShow();

  //? Empty The Form Input From Data
  resetAllInputs();

  //? Close Modal After Finishing
  closeModal();

  //? Show Successfull Message
  showMessage({
    title: "Added!",
    text: "Contact has been added successfully.",
    timer: 2000,
  });
}

//^ Display All Contacts Function
function displayAllContacts(contactSelected, search = "") {
  //? In Empty List Case
  if (contactSelected.length === 0) {
    clearAllBtn.classList.add("d-none");
    contacts.innerHTML = `
     <div class="w-50 mx-auto text-center py-5">
      <div class="mb-4 d-flex justify-content-center">
        <i 
          class="fa-solid fa-address-book d-flex justify-content-center align-items-center rounded-4"
          style="font-size: 2rem; background-color:#f3f4f6;color:#d1d5dc;padding:25px 45px;"
        ></i>
      </div>

      <h2 class="fs-6 text-secondary mb-2">No contacts found</h2>

      <p class="text-secondary text-opacity-75 small">
      Click "Add Contact" to get started
      </p>
    </div>

      `;
    return;
  }

  //? In Data Existed In The List Case

  clearAllBtn.classList.remove("d-none");

  var content = "";
  for (var i = 0; i < contactSelected.length; i++) {
    //? Highlight For Search Word

    var contactFilteredName = highlightText(
      contactSelected[i].fullName,
      search,
    );
    var contactFilteredPhone = highlightText(
      contactSelected[i].phoneNumber,
      search,
    );
    var contactFilteredEmail = highlightText(contactSelected[i].email, search);

    //? Initials Of The Name

    var initials = getInitials(contactSelected[i].fullName);
    var imageContent = "";
    if (
      contactSelected[i].image &&
      !contactSelected[i].image.includes("undefined")
    ) {
      imageContent = `<img src="${contactSelected[i].image}" alt="Contact Photo" class="rounded-4" />`;
    } else {
      imageContent = `<div class="logo-name text-white fs-6 fw-bold d-flex justify-content-center align-items-center rounded-4" style="width:60px; height:60px; background-color: var(--violet-color);">${initials}</div>`;
    }

    //? Include Data In HTML

    content += `
    
          <div class="col">
        <div class="card rounded-4 overflow-hidden">
          <div class="card-body pb-0">
            <div
              class="card-title d-flex justify-content-start align-items-center gap-3"
            >
              <div class="position-relative">
                <i
                  id="starImage"
                  class="fa-solid fa-star bg-warning rounded-5 text-white border border-3 border-white position-absolute d-flex justify-content-center align-items-center ${contactSelected[i].isFavorite ? "" : "d-none"}"
                ></i>
                <i
                  id="heartImage"
                  class="fa-solid fa-heart-pulse bg-danger rounded-5 text-white border border-3 border-white position-absolute d-flex justify-content-center align-items-center ${contactSelected[i].isEmergency ? "" : "d-none"}"
                ></i>
                ${imageContent}
              </div>
              <div class="head-info">
                <h4 class="fw-bold fs-6 m-0 mb-2">
                  ${contactFilteredName}
                </h4>
                <div
                  class="icon d-flex justify-content-start align-items-center text-secondary small"
                >
                  <i
                    class="fa-solid fa-phone text-primary bg-primary bg-opacity-25 me-2 d-flex justify-content-center align-items-center"
                  ></i>
                  <p class="m-0">${contactFilteredPhone}</p>
                </div>
              </div>
            </div>
            <div class="card-user-info mt-3">
              <div class="icon mail mb-2">
                <div
                  class="mail-icon d-flex justify-content-start align-items-center gap-2"
                >
                  <i
                    class="fa-solid fa-envelope d-flex justify-content-center align-items-center rounded-3 ${contactFilteredEmail === "" ? "d-none" : ""}"
                  ></i>
                  <p class="m-0 small text-dark text-opacity-75">
                    ${contactFilteredEmail}
                  </p>
                </div>
              </div>
              <div class="icon location">
                <div
                  class="location-icon d-flex justify-content-start align-items-center gap-2"
                >
                  <i
                    class="fa-solid fa-location-dot d-flex justify-content-center align-items-center rounded-3 ${contactSelected[i].address === "" ? "d-none" : ""}"
                  ></i>
                  <p class="m-0 small text-dark text-opacity-75">
                    ${contactSelected[i].address}
                  </p>
                </div>
              </div>
            </div>
            <div
              class="card-tabs d-flex justify-content-start align-items-center gap-2 my-2"
            >
              <p
                class="m-0 group-badge badge-${contactSelected[i].group} ${contactSelected[i].group === "Select a group" ? "d-none" : "text-capitalize"}"
              >
                ${contactSelected[i].group}
              </p>
              <p
                class="group-badge bg-danger bg-opacity-10 text-danger m-0 ${contactSelected[i].isEmergency ? "" : "d-none"}"
              >
                <i class="fa-solid fa-heart-pulse me-2"></i
                >Emergency
              </p>
            </div>
          </div>
          <div class="custom-card-footer border-0 px-3 py-2">
            <div
              class="d-flex justify-content-between align-items-center"
            >
              <div class="foot-left">
                <div
                  class="action-link d-flex justify-content-start align-items-center gap-3"
                >
                  <div class="phone">
                    <a href="tel:+2${contactSelected[i].phoneNumber}"
                      ><i
                        class="fa-solid fa-phone rounded-3 d-flex justify-content-center align-items-center"
                      ></i
                    ></a>
                  </div>
                  <div class="mail">
                    <a href="mailto: ${contactSelected[i].email}">
                      <i
                        class="fa-solid fa-envelope rounded-3 d-flex justify-content-center align-items-center"
                      ></i
                    ></a>
                  </div>
                </div>
              </div>
              <div class="foot-right">
                <div
                  class="action-icons text-secondary d-flex justify-content-start align-items-center gap-1"
                >
                <div onclick="toggleFavorite(${contactSelected.length < contactsList.length ? contactSelected[i].oldIndex : i})" class="action-icon star me-1" style="cursor: pointer;">
                  <i class="${contactSelected[i].isFavorite ? "fa-solid fa-star text-warning bg-warning bg-opacity-10" : "fa-regular fa-star text-secondary"} fs-6 rounded-3 d-flex justify-content-center align-items-center"></i>
                </div>

                <div onclick="toggleEmergency(${contactSelected.length < contactsList.length ? contactSelected[i].oldIndex : i})" class="action-icon heart me-1" style="cursor: pointer;">
                  <i class="${contactSelected[i].isEmergency ? "fa-solid fa-heart-pulse text-danger bg-danger bg-opacity-10" : "fa-regular fa-heart text-secondary"} fs-6 rounded-3 d-flex justify-content-center align-items-center"></i>
                </div>
                  <div class="action-icon pen me-1">
                    <i onclick="setDataToInputs(${contactSelected.length < contactsList.length ? contactSelected[i].oldIndex : i})" class="fa-solid fa-pen small rounded-3 d-flex justify-content-center align-items-center"></i>
                  </div>
                  <div class="action-icon trash">
                    <i
                      onclick="deleteContact(${contactSelected.length < contactsList.length ? contactSelected[i].oldIndex : i})"
                      class="fa-solid fa-trash small rounded-3 d-flex justify-content-center align-items-center"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    `;
  }
  contacts.innerHTML = content;
}

//^ Delete Contact Function

function deleteContact(index) {
  var deletedContactName = contactsList[index].fullName;
  confirmFunction(
    "Delete Contact?",
    `Are you sure you want to delete ${deletedContactName}? This action cannot be undone.`,
    "warning",
    "#ee2b2b",
    "#606773",
    "Yes, delete it!",
    function () {
      contactsList.splice(index, 1);
      restoreAndShow();
    },

    "Deleted!",
    "Contact has been deleted.",
  );
}

//^ Delete All Contacts

function deleteAllContacts() {
  confirmFunction(
    "Delete All Contacts?",
    "Are you sure you want to delete All Contacts Existed In Your List? This action cannot be undone.",
    "warning",
    "#ee2b2b",
    "#606773",
    "Yes, delete them!",
    function () {
      contactsList = [];
      restoreAndShow();
    },

    "Deleted!",
    "Contact List has been deleted, It's Empty Now.",
  );
}

//^ Set Data To Inputs Functions

var updateIndex;
function setDataToInputs(index) {
  //? Show Modal And Edit Its Title
  showModal();
  document.querySelector(".modalHead h3").innerHTML = "Edit Contact";

  //? The Current Index For Contact Card
  updateIndex = index;

  //? Set Contact Data To Inputs

  fullNameInput.value = contactsList[updateIndex].fullName;
  phoneNumberInput.value = contactsList[updateIndex].phoneNumber;
  emailAddressInput.value = contactsList[updateIndex].email;
  addressInput.value = contactsList[updateIndex].address;
  groupInput.value = contactsList[updateIndex].group;
  notesInput.value = contactsList[updateIndex].notes;
  favoriteCheckBox.checked = contactsList[updateIndex].isFavorite;
  emergencyCheckBox.checked = contactsList[updateIndex].isEmergency;

  //? Set Image Data To Image Input
  if (
    contactsList[updateIndex].image &&
    !contactsList[updateIndex].image.includes("undefined")
  ) {
    previewImg.src = contactsList[updateIndex].image;
    previewImg.classList.remove("d-none");
    userIcon.classList.add("d-none");
  } else {
    previewImg.classList.add("d-none");
    userIcon.classList.remove("d-none");
  }

  //? Change Button
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

//^ Updata Contact Function

function updateContact() {
  //? Set New Data To Contact

  contactsList[updateIndex].fullName = fullNameInput.value;
  contactsList[updateIndex].phoneNumber = phoneNumberInput.value;
  contactsList[updateIndex].email = emailAddressInput.value;
  contactsList[updateIndex].address = addressInput.value;
  contactsList[updateIndex].group = groupInput.value;
  contactsList[updateIndex].notes = notesInput.value;
  contactsList[updateIndex].isFavorite = favoriteCheckBox.checked;
  contactsList[updateIndex].isEmergency = emergencyCheckBox.checked;

  //? Update Image

  if (!previewImg.classList.contains("d-none")) {
    contactsList[updateIndex].image = previewImg.src;
  } else {
    contactsList[updateIndex].image = undefined;
  }

  //? Store New Updated Data Of Contact In The Storage And Display It
  restoreAndShow();

  //? Empty The Form Input From Data
  resetAllInputs();

  //? Close Modal After Finishing
  closeModal();

  //? Change Button
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");

  //? Show Message
  showMessage({
    title: "Updated!",
    text: "Contact has been updated successfully.",
    timer: 2000,
  });
}

//^ Search Contact Function
var searchTerm = "";
function searchContact(searchedContact) {
  searchTerm = searchedContact.value;
  filteredContactList = [];
  for (let i = 0; i < contactsList.length; i++) {
    if (
      contactsList[i].fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      contactsList[i].phoneNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      contactsList[i].email.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      contactsList[i].oldIndex = i;
      filteredContactList.push(contactsList[i]);
    }
  }
  displayAllContacts(filteredContactList, searchTerm);
}

//& End Main Functions

//~ Helpful Function

//^ Restore And Show Function

function restoreAndShow() {
  localStorage.setItem("contactList", JSON.stringify(contactsList));
  displayAllContacts(contactsList);
  favoriteList();
  emergencyList();
  totalNum.innerHTML = contactsList.length;
  totalContacts.innerHTML = contactsList.length;
}

//^ Show Modal Function

function showModal() {
  document.querySelector(".modalHead h3").innerHTML = "Add New Contact";
  customModal.classList.remove("d-none");
  customModal.classList.add("d-block");
}

//^ Close Modal Function

function closeModal() {
  resetAllInputs();
  resetErrors();
  customModal.classList.remove("d-block");
  customModal.classList.add("d-none");
}

//^ Reset All Inputs

function resetAllInputs() {
  contactImageInput.value = "";
  fullNameInput.value = "";
  previewImg.classList.add("d-none");
  userIcon.classList.remove("d-none");
  phoneNumberInput.value = "";
  emailAddressInput.value = "";
  addressInput.value = "";
  groupInput.value = "Select a group";
  notesInput.value = "";
  favoriteCheckBox.checked = false;
  emergencyCheckBox.checked = false;
}

//^ Favorite Contact List

function favoriteList() {
  var favoriteContacts = contactsList.filter((contact) => contact.isFavorite);
  favoriteNum.innerHTML = favoriteContacts.length;

  if (favoriteContacts.length === 0) {
    favoriteContentList.innerHTML = `
    <div class="mx-auto text-center py-4">
      <div class="d-flex justify-content-center align-items-center">
      <p class="text-secondary text-opacity-75 small">
      No favorites yet
      </p>
    </div>

      `;
    return;
  }

  var favContacts = "";
  for (var i = 0; i < favoriteContacts.length; i++) {
    var nameParts = favoriteContacts[i].fullName.trim().split(" ");
    var initials = nameParts[0].charAt(0).toUpperCase();
    if (nameParts.length > 1) {
      initials += nameParts[1].charAt(0).toUpperCase();
    }

    var imageContent = "";
    if (
      favoriteContacts[i].image &&
      !favoriteContacts[i].image.includes("undefined")
    ) {
      imageContent = `<img src="${favoriteContacts[i].image}" alt="" class="rounded-4" style="width:40px; height:40px; object-fit:cover;" />`;
    } else {
      imageContent = `<div class="text-white small fw-bold d-flex justify-content-center align-items-center rounded-4" style="width:40px; height:40px; background-color: var(--violet-color);">${initials}</div>`;
    }

    favContacts += `
      <li class="list-item d-flex justify-content-between align-items-center w-100 py-2 px-3 rounded-4 mb-3">
        <div class="d-flex justify-content-start align-items-center gap-2">
          <div class="text-white fs-6 fw-bold">
            ${imageContent}
          </div>
          <div class="details">
            <h5 class="m-0 small">${favoriteContacts[i].fullName}</h5>
            <p class="m-0 text-secondary" style="font-size:12px;">${favoriteContacts[i].phoneNumber}</p>
          </div>
        </div>
        <a href="tel:+2${favoriteContacts[i].phoneNumber}" class="icon">
          <i class="fa-solid fa-phone d-flex justify-content-center align-items-center"></i>
        </a>
      </li>
    `;
  }
  favoriteContentList.innerHTML = favContacts;
}

//^ Favorite Contact List

function emergencyList() {
  var emergencyContacts = contactsList.filter((contact) => contact.isEmergency);
  emergencyNum.innerHTML = emergencyContacts.length;

  if (emergencyContacts.length === 0) {
    emergencyContentList.innerHTML = `
    <div class="mx-auto text-center py-4">
      <div class="d-flex justify-content-center align-items-center">
      <p class="text-secondary text-opacity-75 small">
      No emergency contacts
      </p>
    </div>

      `;
    return;
  }

  var emergencyContactsContent = "";
  for (var i = 0; i < emergencyContacts.length; i++) {
    var nameParts = emergencyContacts[i].fullName.trim().split(" ");
    var initials = nameParts[0].charAt(0).toUpperCase();
    if (nameParts.length > 1) {
      initials += nameParts[1].charAt(0).toUpperCase();
    }

    var imageContent = "";
    if (
      emergencyContacts[i].image &&
      !emergencyContacts[i].image.includes("undefined")
    ) {
      imageContent = `<img src="${emergencyContacts[i].image}" alt="" class="rounded-4" style="width:40px; height:40px; object-fit:cover;" />`;
    } else {
      imageContent = `<div class="text-white small fw-bold d-flex justify-content-center align-items-center rounded-4" style="width:40px; height:40px; background-color: var(--violet-color);">${initials}</div>`;
    }

    emergencyContactsContent += `
      <li class="list-item d-flex justify-content-between align-items-center w-100 py-2 px-3 rounded-4 mb-3">
        <div class="d-flex justify-content-start align-items-center gap-2">
          <div class="text-white fs-6 fw-bold">
            ${imageContent}
          </div>
          <div class="details">
            <h5 class="m-0 small">${emergencyContacts[i].fullName}</h5>
            <p class="m-0 text-secondary" style="font-size:12px;">${emergencyContacts[i].phoneNumber}</p>
          </div>
        </div>
        <a href="tel:+2${emergencyContacts[i].phoneNumber}" class="icon">
          <i class="fa-solid fa-phone d-flex justify-content-center align-items-center"></i>
        </a>
      </li>
    `;
  }
  emergencyContentList.innerHTML = emergencyContactsContent;
}

//^ Search UI Function

function searchUI(listFunction) {
  localStorage.setItem("contactList", JSON.stringify(contactsList));

  listFunction();

  if (searchTerm === "" || searchTerm == null) {
    displayAllContacts(contactsList);
  } else {
    searchContact(searchInput);
  }
}

//^ Toggle Favorite Function

function toggleFavorite(index) {
  contactsList[index].isFavorite = !contactsList[index].isFavorite;

  searchUI(favoriteList);
}

//^ Toggle Emergency Function

function toggleEmergency(index) {
  contactsList[index].isEmergency = !contactsList[index].isEmergency;

  searchUI(emergencyList);
}

//^ Clear Search Input Function
searchInput.addEventListener("input", function () {
  xMarkClearSearchInput.classList.remove("d-none");
});
function clearSearchInput() {
  searchInput.value = "";
  xMarkClearSearchInput.classList.add("d-none");
  displayAllContacts(contactsList);
}

//^ Clear Photo Function

function removeSelectedPhoto() {
  var overlay = document.getElementById("deletePhotoOverlay");

  contactImageInput.value = "";
  previewImg.src = "";
  previewImg.classList.add("d-none");
  userIcon.classList.remove("d-none");
  overlay.classList.add("d-none");
}

//^ change Photo
contactImageInput.addEventListener("change", function () {
  var file = this.files[0];
  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.classList.remove("d-none");
      userIcon.classList.add("d-none");
    };
    reader.readAsDataURL(file);
  }
});

//^ Highlight Search Word

function highlightText(text, search) {
  if (!search) return text;

  var regex = new RegExp(`(${search})`, "gi");

  return text.replace(regex, function (match) {
    return `<span class="bg-warning text-dark">${match}</span>`;
  });
}

//^ Initials Of Contact Name

function getInitials(fullName) {
  var nameParts = fullName.trim().split(" ");

  var firstInitial = nameParts[0].charAt(0).toUpperCase();

  if (nameParts.length === 1) {
    return firstInitial;
  }

  var lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();

  return firstInitial + lastInitial;
}

//^ Show Message Function

function showMessage({
  title,
  text,
  icon = "success",
  timer = null,
  showConfirmButton = false,
  timerProgressBar = false,
}) {
  Swal.fire({
    title,
    text,
    icon,
    timer,
    showConfirmButton,
    timerProgressBar,
  });
}

//^ Show Confirm Message Function

function confirmFunction(
  title,
  text,
  icon = "warning",
  confirmButtonColor,
  cancelButtonColor,
  confirmButtonText,
  callback,
  fireTitle,
  fireText,
) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: confirmButtonColor,
    cancelButtonColor: cancelButtonColor,
    confirmButtonText: confirmButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      callback();

      Swal.fire({
        title: fireTitle,
        text: fireText,
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  });
}

//^ Keyboard Shortcuts (Enter to Save, Esc to Close)
document.addEventListener("keydown", function (event) {
  if (customModal.classList.contains("d-block")) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!addBtn.classList.contains("d-none")) {
        addContact();
      } else if (!updateBtn.classList.contains("d-none")) {
        updateContact();
      }
    }
    if (event.key === "Escape") {
      closeModal();
    }
  }
});

//& End Helpful Function

//~ Validation Function

//^ Required Inputs Validation Function

function requireInputsValidation() {
  //? Full Name Required Validation

  if (fullNameInput.value === "") {
    showMessage({
      title: "Missing Name",
      text: "Please enter a name for the contact!",
      icon: "error",
      showConfirmButton: true,
    });
    fullNameInput.focus();
    fullNameInput.classList.add("is-invalid");
    return false;
  }

  //? Phone Number Required Validation

  if (phoneNumberInput.value === "") {
    showMessage({
      title: "Missing Phone",
      text: "Please enter a phone number!",
      icon: "error",
      showConfirmButton: true,
    });

    phoneNumberInput.focus();
    phoneNumberInput.classList.add("is-invalid");

    return false;
  }

  //? Duplicate  Phone Number Validation

  function normalizeEgyptPhone(phone) {
    return phone.replace(/^(\+2|2)/, "");
  }
  var currentPhone = normalizeEgyptPhone(phoneNumberInput.value);
  var existingContact = contactsList.find(function (contact) {
    return normalizeEgyptPhone(contact.phoneNumber) === currentPhone;
  });

  if (existingContact) {
    showMessage({
      title: "Duplicate Phone Number",
      text: `A contact with this phone number already exists: ${existingContact.fullName}`,
      icon: "error",
      showConfirmButton: true,
    });
    phoneNumberInput.focus();
    phoneNumberInput.classList.add("is-invalid");
    return false;
  }

  return true;
}

//^ Full Name Validation Function

function fullNameValidate() {
  var fullNameRegex = /^[A-Za-z\u0600-\u06FF\s]{2,50}$/;
  var fullNameValue = fullNameInput.value.trim();
  var fullNameError = document.getElementById("fullNameError");

  if (fullNameRegex.test(fullNameValue)) {
    fullNameError.classList.add("d-none");
    fullNameInput.classList.remove("is-invalid");
    return true;
  } else {
    fullNameError.classList.remove("d-none");
    fullNameInput.classList.remove("is-valid");
    fullNameInput.classList.add("is-invalid");
    return false;
  }
}

//^ Phone Number Validation Function

function phoneNumberValidate() {
  var egyptPhoneRegex = /^(\+2|2)?01[0125][0-9]{8}$/;
  var phoneNumberValue = phoneNumberInput.value.trim();
  var phoneNumberError = document.getElementById("phoneNumberError");

  if (egyptPhoneRegex.test(phoneNumberValue)) {
    phoneNumberError.classList.add("d-none");
    phoneNumberInput.classList.remove("is-invalid");
    return true;
  } else {
    phoneNumberError.classList.remove("d-none");
    phoneNumberInput.classList.remove("is-valid");
    phoneNumberInput.classList.add("is-invalid");
    return false;
  }
}

//^ Email Validation Function

function emailValidate() {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var emailValue = emailAddressInput.value.trim();
  var emailError = document.getElementById("emailError");

  if (emailRegex.test(emailValue)) {
    emailError.classList.add("d-none");
    emailAddressInput.classList.remove("is-invalid");
    return true;
  } else {
    emailError.classList.remove("d-none");
    emailAddressInput.classList.remove("is-valid");
    emailAddressInput.classList.add("is-invalid");
    return false;
  }
}

//^ Validation All Fields Function

function validateAllFields() {
  if (!fullNameValidate()) {
    showMessage({
      title: "Invalid Name",
      text: "Name should contain only letters and spaces (2-50 characters)",
      icon: "error",
      showConfirmButton: true,
    });
    return false;
  }

  if (!phoneNumberValidate()) {
    showMessage({
      title: "Invalid Phone",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
      icon: "error",
      showConfirmButton: true,
    });
    return false;
  }

  if (emailAddressInput.value !== "" && !emailValidate()) {
    showMessage({
      title: "Invalid Email",
      text: "Please enter a valid email address",
      icon: "error",
      showConfirmButton: true,
    });
    return false;
  }

  return true;
}

//^ Reset Errors Function

function resetErrors() {
  fullNameError.classList.add("d-none");
  phoneNumberError.classList.add("d-none");
  emailError.classList.add("d-none");
  fullNameInput.classList.remove("is-invalid");
  phoneNumberInput.classList.remove("is-invalid");
  emailAddressInput.classList.remove("is-invalid");
}

//^ Clear Validation When Clear Input Value Function

function clearValidationOnEmpty(input, errorElement) {
  input.addEventListener("input", function () {
    if (input.value.trim() === "") {
      input.classList.remove("is-invalid");
      errorElement?.classList.add("d-none");
    }
  });
}
clearValidationOnEmpty(fullNameInput, fullNameError);
clearValidationOnEmpty(phoneNumberInput, phoneNumberError);
clearValidationOnEmpty(emailAddressInput, emailError);

//& End Validation Function
