const button = document.getElementById("loadBtn");
const rankSelect = document.getElementById("rankSelect");
const list = document.getElementById("mallList");

async function fetchMall() {
  try {
    const response = await fetch("https://mall-api-l6c2.onrender.com/malls");
    if (!response.ok) {
      throw new Error("Could not fetch this resource");
    }

    const data = await response.json();
    console.log(data);
    const rank = document.getElementById("rankSelect");

    //this part is so that we're able to select another option because if premium is the default and you select it ,due to the evnt listener used it doesn't change event so no new result would show
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Please select a Class";
    defaultOption.selected = true;
    rankSelect.appendChild(defaultOption);

    //this part uses the ranks fetched from the api as options in the dropdown menu but since we don't want it to repeat ranks we use the if not included already then add
    const addedRank = [];
    data.forEach((item) => {
      if (!addedRank.includes(item.rank)) {
        const option = document.createElement("option");
        option.value = item.rank;
        option.textContent = item.rank;
        rank.appendChild(option);

        addedRank.push(item.rank);
      }
    });

    button.addEventListener("click", async () => {
      //the trim is to account for any differences in space with how the options are pelt in the api
      const selectedValue = rank.value.trim().toLowerCase();
      if (!selectedValue) {
        alert("Please select a class first.");
        return;
      }

      list.innerHTML = "";

      console.log("Selected value:", selectedValue);
      const filteredMalls = data.filter(
        (mall) =>
          mall.rank.trim().toLowerCase() === selectedValue.trim().toLowerCase()
      );
      console.log("filtered malls", filteredMalls);

      button.textContent = "Loading...";
      button.disabled = true;
      await new Promise((resolve) => setTimeout(resolve, 2000));
      filteredMalls.forEach((mall) => {
        const li = document.createElement("li");
        li.textContent = ` Mall name :${mall.name} , Location:${mall.city}`;
        list.appendChild(li);

        button.textContent = "Load";
        button.disabled = false;
      });
    });
  } catch (error) {
    console.error(error);
  }
}
fetchMall();
