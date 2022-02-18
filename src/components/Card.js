import Box from "@mui/material/Box"

export default function Card({ color, onClick, light }) {
  return (
    <Box
      onClick={onClick}
      className={`colors ${color} ${light ? "light" : ""}`}
     />
  );
}
