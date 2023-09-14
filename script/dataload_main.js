
// data pull
async function getProducts(id = null) {
    const { createClient } = supabase
    const _supabase = createClient('https://kswscmjoqonxyqabktgv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzd3NjbWpvcW9ueHlxYWJrdGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4MjM1OTEsImV4cCI6MjAwOTM5OTU5MX0.ILlRzBX-qHqmGfVcm73fU_PbsmGFQur9pOkETXzSAHE')
    //console.log('Supabase Instance: ', _supabase)


    const urlParams = new URLSearchParams(window.location.search);
    const ravareid = urlParams.get("ravareid");

    if(ravareid != null) {
        const { data, error } = await _supabase
            .from('vildmad')
            .select()
            .eq('id', ravareid); 
        console.log(data);
        document.querySelector(".ravare_item h3").innerHTML = data[0].title;
        document.querySelector(".ravare_item img").setAttribute("src", data[0].profile_image_src);

        const seasons = data[0].seasons;
        season_array = seasons.split(",");
        let is = 0;
        season_array.forEach(function() {
            if(season_array[is] == 1) { season_txt = "Vinter"; }
            if(season_array[is] == 2) { season_txt = "Forår"; }
            if(season_array[is] == 3) { season_txt = "Sommer"; }
            if(season_array[is] == 4) { season_txt = "Efterår"; }
            season_node = document.createElement("span");
            season_node_txt = document.createTextNode(season_txt);
            season_node.appendChild(season_node_txt);
            document.querySelector(".seasons_list").appendChild(season_node);
            is++;
        });

        document.querySelector(".ravare_desc").textContent = data[0].description;
        document.querySelector(".ravare_category").textContent = "Kategori: " + data[0].categories_name;
        
        document.querySelector(".ravare_find").textContent = data[0].sankning;
        document.querySelector(".ravare_sans").textContent = data[0].description_info;
        document.querySelector(".ravare_raad").textContent = data[0].season_info;
        document.querySelector(".ravare_warn").textContent = data[0].warning;
    }
    else {
        const { data, error } = await _supabase
            .from('vildmad')
            .select();
        console.log(data);
        let i = 0;
        data.forEach(function() {
            const temp = document.querySelector("#item_template").content;
            const copy = temp.cloneNode(true);
            copy.querySelector(".title a").innerHTML = data[i].title;
            copy.querySelector(".title a").setAttribute("href", "ravare.html?ravareid=" + data[i].id);

            copy.querySelector(".find").setAttribute("href", "#find_" + data[i].id);
            copy.querySelector(".sans").setAttribute("href", "#sans_" + data[i].id);
            copy.querySelector(".raad").setAttribute("href", "#raad_" + data[i].id);
            copy.querySelector(".warn").setAttribute("href", "#warn_" + data[i].id);

            copy.querySelector("#sans").setAttribute("id", "sans_" + data[i].id);
            copy.querySelector("#find").setAttribute("id", "find_" + data[i].id);
            copy.querySelector("#raad").setAttribute("id", "raad_" + data[i].id);
            copy.querySelector("#warn").setAttribute("id", "warn_" + data[i].id);

            copy.querySelector("#find_" + data[i].id + " p").textContent = data[i].sankning;
            copy.querySelector("#sans_" + data[i].id + " p").textContent = data[i].description_info;
            copy.querySelector("#raad_" + data[i].id + " p").textContent = data[i].season_info;
            copy.querySelector("#warn_" + data[i].id + " p").textContent = data[i].warning;

            copy.querySelector(".description").innerHTML = data[i].description;
            copy.querySelector("img").setAttribute("src", data[i].profile_image_src);
            document.querySelector(".items").appendChild(copy);
            i++;
        })
    }
}


// pulls data from light table - unused
async function getTitle(id) {
    const { data, error } = await _supabase
        .from('vildmad')
        .select('title')
        .eq('id', id);

    console.log(data[0].title);
    const para = document.querySelector("#para");
    para.innerHTML = data[0].title;
}

// pulls recipies from database
async function getRecipies() {
    const { createClient } = supabase
    const _supabase = createClient('https://llthtgqhxidevgqeuamr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdGh0Z3FoeGlkZXZncWV1YW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4MDU3ODgsImV4cCI6MjAwOTM4MTc4OH0.0eW4U0sktayns66yyc5EV3CDgw86yMuFTXGCk8Lc2mg')
    //console.log('Supabase Instance: ', _supabase)

    const urlParams = new URLSearchParams(window.location.search);
    const opskriftid = urlParams.get("opskriftid");
    const ravareid = urlParams.get("ravareid");

    if(opskriftid != null) {
        const { data, error } = await _supabase
            .from('vildmad_opskrifter_manuel')
            .select()
            .eq('id', opskriftid);
        console.log(data);
        document.querySelector("h3").innerHTML = data[0].title;
        document.querySelector("span").innerHTML = data[0].vild_raavare1;
        if(data[0].vild_raavare2 != null) {
            rv1clone = document.querySelector("span");
            rv1clone.insertAdjacentHTML("afterend", "<span>" + data[0].vild_raavare2 + "</span>");
        }
        if(data[0].vild_raavare3 != null) {
            rv2clone = document.querySelector("span");
            rv2clone.insertAdjacentHTML("afterend", "<span>" + data[0].vild_raavare3 + "</span>");
        }

        document.querySelector(".rec_desc").innerHTML = data[0].beskrivelse;
        document.querySelector(".rec_left img").setAttribute("src", data[0].opskrift_img);
        // ingredients
        let in_list = document.querySelector(".ingredients_list");
        document.querySelector(".ingredients_list li").innerHTML = data[0].ingrediens1 + " - " + data[0].maaleenhed1;
        if(data[0].ingrediens2 != null) {
            linode = document.createElement("li");
            linode_txt = document.createTextNode(data[0].ingrediens2 + " - " + data[0].maaleenhed2);
            linode.appendChild(linode_txt);
            in_list.appendChild(linode);
        }
        if(data[0].ingrediens3 != null) {
            linode = document.createElement("li");
            linode_txt = document.createTextNode(data[0].ingrediens3 + " - " + data[0].maaleenhed3);
            linode.appendChild(linode_txt);
            in_list.appendChild(linode);
        }
        if(data[0].ingrediens4 != null) {
            linode = document.createElement("li");
            linode_txt = document.createTextNode(data[0].ingrediens4 + " - " + data[0].maaleenhed4);
            linode.appendChild(linode_txt);
            in_list.appendChild(linode);
        }
        if(data[0].ingrediens5 != null) {
            linode = document.createElement("li");
            linode_txt = document.createTextNode(data[0].ingrediens5 + " - " + data[0].maaleenhed5);
            linode.appendChild(linode_txt);
            in_list.appendChild(linode);
        }
        if(data[0].ingrediens6 != null) {
            linode = document.createElement("li");
            linode_txt = document.createTextNode(data[0].ingrediens6 + " - " + data[0].maaleenhed6);
            linode.appendChild(linode_txt);
            in_list.appendChild(linode);
        }
        if(data[0].ingrediens7 != null) {
            linode = document.createElement("li");
            linode_txt = document.createTextNode(data[0].ingrediens7 + " - " + data[0].maaleenhed7);
            linode.appendChild(linode_txt);
            in_list.appendChild(linode);
        }
        // tilberedning
        let prep_list = document.querySelector(".preparation_steps");
        document.querySelector(".preparation_steps li").innerHTML = data[0].fremgang1;
        if(data[0].fremgang2 != null) {
            linode = document.createElement("li");
            linode_txt = document.createTextNode(data[0].fremgang2);
            linode.appendChild(linode_txt);
            prep_list.appendChild(linode);
        }
        if(data[0].fremgang3 != null) {
            linode = document.createElement("li");
            linode_txt = document.createTextNode(data[0].fremgang3);
            linode.appendChild(linode_txt);
            prep_list.appendChild(linode);
        }
        if(data[0].fremgang4 != null) {
            linode = document.createElement("li");
            linode_txt = document.createTextNode(data[0].fremgang4);
            linode.appendChild(linode_txt);
            prep_list.appendChild(linode);
        }
        if(data[0].fremgang5 != null) {
            linode = document.createElement("li");
            linode_txt = document.createTextNode(data[0].fremgang5);
            linode.appendChild(linode_txt);
            prep_list.appendChild(linode);
        }
        if(data[0].fremgang6 != null) {
            linode = document.createElement("li");
            linode_txt = document.createTextNode(data[0].fremgang6);
            linode.appendChild(linode_txt);
            prep_list.appendChild(linode);
        }
        if(data[0].fremgang7 != null) {
            linode = document.createElement("li");
            linode_txt = document.createTextNode(data[0].fremgang7);
            linode.appendChild(linode_txt);
            prep_list.appendChild(linode);
        }
    }
    else if(ravareid != null) {
        const { data, error } = await _supabase
            .from('vildmad_opskrifter_manuel')
            .select()
            .eq("ingrediens1", ravareid);
        console.log(data);
        let i = 0;
        data.forEach(function() {
            const temp = document.querySelector("#rec_item_template").content;
            const copy = temp.cloneNode(true);
            copy.querySelector(".rec_title a").innerHTML = data[i].title;
            copy.querySelector(".rec_title a").setAttribute("href", "opskrift.html?opskriftid=" + data[i].id);
            copy.querySelector(".rec_desc").innerHTML = data[i].beskrivelse;
            copy.querySelector(".rec_top img").setAttribute("src", data[i].opskrift_img);
            document.querySelector(".rec_list").appendChild(copy);
            i++;
        });
    }
    else {
        const { data, error } = await _supabase
            .from('vildmad_opskrifter_manuel')
            .select(); 
        console.log(data);
        let i = 0;
        data.forEach(function() {
            const temp = document.querySelector("#rec_item_template").content;
            const copy = temp.cloneNode(true);
            copy.querySelector(".rec_title a").innerHTML = data[i].title;
            copy.querySelector(".rec_title a").setAttribute("href", "opskrift.html?opskriftid=" + data[i].id);
            copy.querySelector(".rec_desc").innerHTML = data[i].beskrivelse;
            copy.querySelector(".rec_top img").setAttribute("src", data[i].opskrift_img);
            document.querySelector(".rec_list").appendChild(copy);
            i++;
        });
    }
}

// data pull for index
async function getFeaturedProducts() {
    const { createClient } = supabase
    const _supabase = createClient('https://kswscmjoqonxyqabktgv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzd3NjbWpvcW9ueHlxYWJrdGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4MjM1OTEsImV4cCI6MjAwOTM5OTU5MX0.ILlRzBX-qHqmGfVcm73fU_PbsmGFQur9pOkETXzSAHE')
    //console.log('Supabase Instance: ', _supabase)

    const { data, error } = await _supabase
            .from('vildmad')
            .select()
            .limit(6);

    console.log(data);
    let i = 0;
    data.forEach(function() {
        const temp = document.querySelector("#index_ravare_template").content;
        const copy = temp.cloneNode(true);

        copy.querySelector(".background_råvare h3").innerHTML = data[i].title;
        copy.querySelector(".two_box_container img").setAttribute("src", data[i].profile_image_src);
        copy.querySelector(".råvare_tekst").textContent = data[i].description;

        copy.querySelector("#ravare_find p").textContent = data[i].sankning;
        copy.querySelector("#ravare_sans p").textContent = data[i].description_info;
        copy.querySelector("#ravare_raad p").textContent = data[i].season_info;
        copy.querySelector("#ravare_warn p").textContent = data[i].warning;

        document.querySelector(".container").appendChild(copy);
        i++;
    })
    const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

// kopieret tabs funktionalitet fra script.js (tror den skal være i samme async function, ellers virkede det ikke, som om det er samme script)
tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
            // Skjul eller vis indholdet afhængigt af den aktuelle tilstand
            if (tabContents[index].classList.contains("active")) {
            tabContents[index].classList.remove("active");
            } else {
            // Skjul alt indhold
            tabContents.forEach((content) => {
                content.classList.remove("active");
            });

            // Vis kun det valgte indhold
            tabContents[index].classList.add("active");
            }
        });
    });
}