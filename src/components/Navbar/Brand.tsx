import brandLogo from "../../assets/images/sand-clock.png";

const Brand = () => {
  return (
    <div className="flex-center gap-2 text-sm mx-4">
        <div><img src={brandLogo} alt="chrono-log-logo" className="h-5 w-5"/></div>
        <span className="max-sm:block text-primary logo-font">CHRONO LOG</span>
    </div>
  )
}

export default Brand