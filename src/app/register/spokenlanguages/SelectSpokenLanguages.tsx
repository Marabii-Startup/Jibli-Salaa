// "use client";
// import Dropdown from "@/components/DropDown";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setTravelerTrip } from "@/store/TravelerTripSlice/slice";

// export default function SpokenLanguagesForm() {
//   const [languages, setLanguages] = useState([]);
//   const dispatch = useDispatch();
//   const travelerTrip = useSelector((state) => state.travelerTrip.value);

//   const setSpokenLanguages = (listOfLangs) => {
//     const parsedLangs = listOfLangs.map((l) => JSON.parse(l));
//     dispatch(setTravelerTrip({ spokenLanguages: parsedLangs }));
//   };

//   useEffect(() => {
//     async function getLanguages() {
//       try {
//         const data = await fetch(
//           `${process.env.NEXT_PUBLIC_CLIENTURL}/languages.json`
//         );
//         const languages = await data.json();
//         setLanguages(languages);
//       } catch (error) {
//         console.log("error getting languages: ", error);
//       }
//     }

//     getLanguages();
//   }, []);

//   return (
//     <div className="p-5">
//       <h1 className="mb-4">Select which languages you speak</h1>
//       <Dropdown
//         multiple={true}
//         label="Select which languages you speak"
//         options={languages?.map((lang) => ({
//           label: lang.nativeName,
//           value: JSON.stringify({ code: lang.code, name: lang.nativeName }),
//         }))}
//         onSelect={setSpokenLanguages}
//       />
//     </div>
//   );
// }

export default function SpokenLanguagesForm(): JSX.Element {
  return <div> spoken languages form: </div>;
}
