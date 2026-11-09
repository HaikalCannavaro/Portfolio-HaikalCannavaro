// Logo-derived hues. Darker light-theme stops keep large display text readable
// against paper; dark-theme stops use the brighter brand family.
export const toolPalettes: Record<string, { light: string[]; dark: string[] }> =
  {
    HTML: {
      light: ["#b93618", "#d25016", "#a63b17"],
      dark: ["#ff7951", "#ffab65", "#ff7951"],
    },
    CSS: {
      light: ["#12589b", "#087db0", "#164d95"],
      dark: ["#54b2f2", "#81d5ff", "#559af0"],
    },
    JavaScript: {
      light: ["#705400", "#997600", "#695000"],
      dark: ["#f7df1e", "#fff39a", "#ebbd27"],
    },
    "Tailwind CSS": {
      light: ["#08798b", "#08658c", "#2059a3"],
      dark: ["#38bdf8", "#5eead4", "#78a8ff"],
    },
    Figma: {
      light: ["#bf3e32", "#bd465b", "#8750be", "#087c9a", "#08755e"],
      dark: ["#ff796d", "#ff9ba4", "#bf95ff", "#63d3ff", "#54e0b5"],
    },
    "Node.js": {
      light: ["#336b2b", "#4b862e", "#28634a"],
      dark: ["#75bd4f", "#a6db75", "#5ccc91"],
    },
    Laravel: {
      light: ["#b92b25", "#d94237", "#b73340"],
      dark: ["#ff665b", "#ff9b85", "#ff6e85"],
    },
    MySQL: {
      light: ["#00618a", "#277591", "#a36316"],
      dark: ["#62b9db", "#86d9e8", "#edb35c"],
    },
    Prisma: {
      light: ["#193648", "#315c67", "#29445c"],
      dark: ["#c2d3e3", "#8ed7cf", "#b4c8ed"],
    },
    Go: {
      light: ["#007d96", "#126b94", "#087e85"],
      dark: ["#00add8", "#6bddf4", "#6de0d3"],
    },
    Java: {
      light: ["#b73c20", "#bb6426", "#2b648c"],
      dark: ["#ef8355", "#ffb56a", "#79bce9"],
    },
    Postman: {
      light: ["#b74020", "#ca5a31", "#a8422c"],
      dark: ["#ff905d", "#ffbb91", "#ff885f"],
    },
    Flutter: {
      light: ["#087caa", "#1565ac", "#164d8b"],
      dark: ["#54c5f8", "#89ddff", "#6aa8ff"],
    },
    Blender: {
      light: ["#ac5216", "#c5681d", "#216887"],
      dark: ["#f59b42", "#ffc078", "#75bddc"],
    },
    "C++": {
      light: ["#235b91", "#397eac", "#174477"],
      dark: ["#83b9e4", "#b1ddfa", "#75a9e3"],
    },
    "C#": {
      light: ["#78348e", "#9a449f", "#623487"],
      dark: ["#cf89dc", "#edb0ed", "#ba8ae3"],
    },
    Git: {
      light: ["#b63822", "#cf4b33", "#9e3027"],
      dark: ["#f87860", "#ffa68f", "#ef7969"],
    },
    GitHub: {
      light: ["#24292f", "#59636d", "#303943"],
      dark: ["#d0d7de", "#ffffff", "#b2bbc6"],
    },
  };
