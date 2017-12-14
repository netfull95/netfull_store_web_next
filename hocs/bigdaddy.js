import { Component } from 'react'
import Head from 'next/head'
import vi from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd'

import MainLayout from 'layouts/main.layout'

const bigdaddy = OurChildComponent => {
  class HigherOrderComponent extends Component {
    static async getInitialProps(ctx) {
      const childProps = OurChildComponent.getInitialProps ? await OurChildComponent.getInitialProps(ctx) : {};
      return { ...childProps }
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
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

          </Head>
          <LocaleProvider locale={vi}>
            <MainLayout>
              <OurChildComponent { ...this.props } />
            </MainLayout>
          </LocaleProvider>
          <style dangerouslySetInnerHTML={{ __html: OurChildComponent.info.style }} />
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-countdown/2.0.2/jquery.plugin.min.js"></script>
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-countdown/2.0.2/jquery.countdown.min.js"></script>
          <script src="/static/js/owl.carousel.min.js"></script>
        </div>
      )
    }
  }

  return HigherOrderComponent
}

export default bigdaddy
