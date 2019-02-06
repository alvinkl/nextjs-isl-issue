import React from 'react'
import { Container, default as App } from 'next/app';
import Head from 'next/head';

import { pws } from '../pageWithStyles'

class CustomApp extends App {
  render() {
    const { Component } = this.props

    return (
      <Container>
        <Head>
          <title>
            Airy Business - Corporate Travel Management Platform in Indonesia
          </title>
          <link
            rel="icon"
            type="image/x-icon"
            href="/static/airybusiness.ico"
          />
        </Head>
          <Component {...this.props} />
      </Container>
    )
  }
}

export default pws(CustomApp)