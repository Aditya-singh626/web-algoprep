async function showData() {
  console.log("Start");

  let data = await fetch("https://api.example.com/data");
  console.log("Got the response!");

  console.log("End");
}

showData();