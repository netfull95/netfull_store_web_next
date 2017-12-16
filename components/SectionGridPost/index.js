import { Component } from 'react'

class SectionGridPost extends Component {
  render() {
    return (
      <section className="zg-gridpost is-horizontal-res">
        <div className="zg-product--header is-flex">
          <span>FURNITURE BLOG</span>
        </div>

        <div className="zg-product--description is-flex" style={{ marginBottom: 35 }}>
          <span>Lastest news of weak</span>
        </div>

        <div className="zg-gridpost--row is-flex">
          <div className="zg-gridpost__image">
          </div>
          <div className="zg-gridpost__text">
            <h4>FURNITURE TIPS</h4>
            <h3>Create Gallery Walls in 3 Fun Steps</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor diam mauris, nec laoreet nibh...</p>
            <span className="zg-gridpost--button">
              Read More
            </span>
          </div>
        </div>

        <div className="zg-gridpost--row is-flex">
          <div className="zg-gridpost__text">
            <h4>FURNITURE TIPS</h4>
            <h3>Expert Tips for Decorating Your Holiday Table</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor diam mauris, nec laoreet nibh...</p>
            <span className="zg-gridpost--button">
              Read More
            </span>
          </div>

          <div className="zg-gridpost__image" style={{ backgroundImage: "url(/static/images/33e47c01-854a-4fdb-8d70-a9fee7ba307c1111111222.jpg) !important" }}>
          </div>
        </div>
      </section>
    )
  }
}

export default SectionGridPost