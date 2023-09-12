/* HENTER OPSKRIFTER */

/* VIRKER IKKE */

const url2 = "https://llthtgqhxidevgqeuamr.supabase.co";

const key2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdGh0Z3FoeGlkZXZncWV1YW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4MDU3ODgsImV4cCI6MjAwOTM4MTc4OH0.0eW4U0sktayns66yyc5EV3CDgw86yMuFTXGCk8Lc2mg";
fetch(
  "https://llthtgqhxidevgqeuamr.supabase.co/rest/v1/vildmad_opskrifter_manuel",
  {
    method: "GET",
    headers: {
      apikey: key2,
    },
  }
)
  .then((res) => res.json())
  .then(showData2);

function showData2(items) {
  console.log(items);
}
