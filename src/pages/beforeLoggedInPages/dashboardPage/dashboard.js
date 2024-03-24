import image1 from "../../../assets/images/buf1.jpg";
import image2 from "../../../assets/images/buf2.jpg";

function DashboardPage() {
  return (
    <div class="d-flex flex-column">
      <div class="">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">
            Navbar
          </a>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto" style={{ width: "100%" }}>
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  DENTAL MARKET PLACE
                </a>
              </li>

              <li class="nav-item me-3 me-lg-0 " style={{ marginLeft: "auto" }}>
                <a class="nav-link text-black" href="#">
                  <i class="fas fa-cog mx-1"></i> Settings
                </a>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle text-black"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fas fa-user mx-1"></i> Profile
                </a>

                <ul
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a class="dropdown-item" href="#">
                      My account
                    </a>
                  </li>

                  <li>
                    <a class="dropdown-item" href="#">
                      Log out
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="">
        <div
          id="carouselExampleCaptions"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src={image1}
                class="d-block w-100"
                alt="slider-image"
                width={200}
                height={350}
              />
            </div>
            <div class="carousel-item">
              <img
                src={image2}
                class="d-block w-100"
                alt="slider-image"
                width={200}
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="p-5 bg-light">
        <div
          class="d-flex flex-row mb-5"
          style={{ justifyContent: "space-evenly" }}
        >
          <div class="card" style={{ width: "18rem" }}>
            <img src={image1} class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text text-center">Dental</p>
            </div>
          </div>
          <div class="card" style={{ width: "18rem" }}>
            <img src={image1} class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text text-center">Dental</p>
            </div>
          </div>
          <div class="card" style={{ width: "18rem" }}>
            <img src={image1} class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text text-center">Dental</p>
            </div>
          </div>
        </div>
        <div
          class="d-flex flex-row mb-3"
          style={{ justifyContent: "space-evenly" }}
        >
          <div class="card" style={{ width: "18rem" }}>
            <img src={image1} class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text text-center">Dental</p>
            </div>
          </div>
          <div class="card" style={{ width: "18rem" }}>
            <img src={image1} class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text text-center">Dental</p>
            </div>
          </div>
          <div class="card" style={{ width: "18rem" }}>
            <img src={image1} class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text text-center">Dental</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
