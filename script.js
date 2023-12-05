var scratchUser = "griffpatch";

function roundDownAndSubtract(integer) {
  let roundedDown = Math.floor(integer / 100000) * 100000;
  let addValue = roundedDown + 100000;
  return addValue - integer;
}

function fetchAndSetCount(icons) {
  fetch(`https://corsproxy.io/?https://scratchstats.com/api2/live/getid/${icons}`)
    .then(res => res.json())
    .then(out => {
      console.log("Updating", icons)
      const id = out.id;
      fetch(`https://corsproxy.io/?https://scratchstats.com/api2/live/id/${id}`)
        .then(res => res.json())
        .then(out => {
          const live = out.count;
          document.getElementById('odometer').innerHTML = live;
        });
    })
}



/* User Icons */
function getIcon(icons) {
  fetch(`https://corsproxy.io/?https://api.scratch.mit.edu/users/${icons}`)
    .then(response => response.json())
    .then(data => {
      const userIcon = data.profile.images['90x90'];
      const username = data.username;
      document.getElementById('user-icon').src = userIcon;
      document.getElementById("username").innerHTML = username;
    });
}



function logData() {
  const response = document.getElementById('inputs').value;
  const trimmedResponse = response.trim().toUpperCase();
  if (trimmedResponse == document.getElementById("username").innerHTML.toUpperCase()) {
    console.log("The data is already inserted");
    alert("The data is already inserted. Please use another user.")
  }
  else {
    if (trimmedResponse == "") {
      alert("Data cannot be empty.")
    }
    else {
      var scratchUser = trimmedResponse;
      document.getElementById('odometer').innerHTML = 0000000;
      console.log("Please wait... We are getting updated information.");
      document.getElementById("username").innerHTML = "Loading..."
      getIcon(scratchUser);
      fetchAndSetCount(scratchUser);
    }
  }
}

getIcon(scratchUser);
setInterval(function(){
  fetchAndSetCount(scratchUser);
}, 5000);
