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
            <link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
          </Head>
          <LocaleProvider locale={vi}>
            <MainLayout>
              <OurChildComponent { ...this.props } />
            </MainLayout>
          </LocaleProvider>
          <style dangerouslySetInnerHTML={{ __html: OurChildComponent.info.style }} />
        </div>
      )
    }
  }

  return HigherOrderComponent
}

export default bigdaddy
