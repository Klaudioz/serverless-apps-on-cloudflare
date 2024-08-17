import { Button } from "@/components/Button"

export default function Home() {
  return (
    <div className="home-body">

      <h3 className="mb-4 pb-2 fw-normal">Check the weather forecast</h3>

      <div className="input-group rounded mb-3">
        <select className="form-control rounded" aria-label="Search"
          aria-describedby="search-addon" id="location-select">
          <option value="london">London, UK</option>
          <option value="new-york">New York, US</option>
          <option value="los-angeles">Los Angeles, US</option>
          <option value="berlin">Berlin, Germany</option>
          <option value="tokyo">Tokyo, Japan</option>
        </select>
        
        <Button />
      </div>
    </div>
  )
}

