import brandLogo from "../../assets/images/sand-clock.png";

const Brand = () => {
  return (
    <div className="flex-center gap-2 my-4 py-2 border-b-2 border-primary">
        <div><img src={brandLogo} alt="chrono-log-logo" className="h-8 w-8"/></div>
        <span className="nav-item-title text-primary logo-font">CHRONO LOG</span>
    </div>
  )
}

export default Brand