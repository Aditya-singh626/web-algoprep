const btn = document.getElementById("but");
btn.addEventListener("click", async () => {
  const response = await fetch("https://api.restful-api.dev/objects", {
    method: "GET",
  });
  const data = await response.json();
  console.log(data);
});
