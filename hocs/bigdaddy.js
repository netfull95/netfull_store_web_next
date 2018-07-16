import { Component } from 'react'
import Head from 'next/head'
import vi from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd'
import { connect, bindActionCreators } from 'store';
import { getAuth } from 'selectors';
import { loginUserSuccess } from "actions";

import MainLayout from 'layouts/main.layout'

const bigdaddy = OurChildComponent => {
  class HigherOrderComponent extends Component {
    static async getInitialProps(ctx) {
      const childProps = OurChildComponent.getInitialProps ? await OurChildComponent.getInitialProps(ctx) : {};
      return { ...childProps, dispatch: ctx.store.dispatch }
    }

    state = {
      user: {}
    }


    componentDidMount() {
      const { dispatch } = this.props;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      let user = localStorage && localStorage.getItem("user_data")
      user = user ? JSON.parse(user) : {}
      if (user.name) dispatch(loginUserSuccess(user))
      this.setState({user})
    }

    render() {
      return (
        <div>
          <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{OurChildComponent.info.title}</title>
            <link href="/static/css/antd.min.2.13.9.css" rel="stylesheet" />
            <link href="/static/dist/global.css" rel="stylesheet" />
            <link rel="stylesheet" href="/static/css/owl.carousel.min.css" />
            <link rel="stylesheet" href="/static/css/animate.css" />
            <link rel="stylesheet" href="/static/css/owl.theme.default.min.css" />
            <link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Lato:400,400italic" rel="stylesheet" />
            {/*<link rel="stylesheet" href="static/css/font-awesome.min.css" />*/}
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

            {/*<script src="/static/js/jquery-3.2.1.min.js"></script>*/}
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/owl.carousel.min.js"></script>
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-countdown/2.0.2/jquery.plugin.min.js"></script>
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-countdown/2.0.2/jquery.countdown.min.js"></script>

          </Head>
          <LocaleProvider locale={vi}>
            <MainLayout { ...this.props }>
              <OurChildComponent { ...this.props } user={this.state.user}/>
            </MainLayout>
          </LocaleProvider>
          <style dangerouslySetInnerHTML={{ __html: OurChildComponent.info.style }} />
        </div>
      )
    }
  }
  const mapStateToProps = (state) => {
    return {
      auth: state.auth,
      products: state.product.data,
      posts: state.post.data,
    }
  }

  return connect(mapStateToProps)(HigherOrderComponent);
}

export default bigdaddy
