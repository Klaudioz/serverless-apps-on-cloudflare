export default function Home() {
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">

        <div className="row d-flex justify-content-center align-items-center 
            h-100">
          <div className="col-md-8 col-lg-6 col-xl-4">

            <h3 className="mb-4 pb-2 fw-normal">
              Check the weather forecast now
            </h3>

            <div className="input-group rounded mb-3">
            <select className="form-control rounded" aria-label="Search"
                aria-describedby="search-addon" id="location-select">
                  <option value="london">London, UK</option>
                  <option value="new-york">New York, US</option>
                  <option value="los-angeles">Los Angeles, US</option>
                  <option value="berlin">Berlin, Germany</option>
                  <option value="tokyo">Tokyo, Japan</option>
                </select>
                <a href="#"
                    type="button" 
                    style={{textDecoration: 'none'}}>
                    
                    <span className="input-group-text border-0 fw-bold"
                          id="search-addon"
                          style={{background: 'none'}}>
                    Check!
                    </span>
                </a>
            </div>

            <div className="card shadow-0 border">
              <div className="card-body p-4">
                <h4 className="mb-1 sfw-normal">
                  New York, US
                </h4>
                <p className="mb-2">
                  Current temperature: <strong>5.42°C</strong>
                </p>
                <p className="mb-2">
                  Windspeed: <strong>12kph</strong>
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
