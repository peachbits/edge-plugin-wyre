// @flow

import './inline.css'

import { APPROVED, PENDING } from '../constants/index'
import React, { Component } from 'react'

import { BuySellSceneConnector } from '../connectors/BuySellSceneConnector'
import CircularProgress from '@material-ui/core/CircularProgress'
import PendingScreenComponent from '../components/PendingScreenComponent'
import SignUpComponent from '../components/SignUpComponent'
import { withStyles } from '@material-ui/core/styles'

type StartSceneProps = {
  history: Object,
  classes: Object,
  accountStatus: string | null,
  wyreAccount: string | null,
  initInfo(): void
}

type StartSceneState = {
}



class StartScene extends Component<StartSceneProps, StartSceneState> {

  componentDidMount = async () => {
    // window.edgeProvider.consoleLog('Sign In Screen ')
    this.props.initInfo()
  }

  initUser = async () => {
    const { wyreAccount } = this.props
    window.edgeProvider.consoleLog('init user wyre account', wyreAccount)
    const widget = new window.Wyre.Widget({
      env: 'production',
      accountId: 'AC-FJN8L976EW4',
      auth: {
        type: 'secretKey',
        secretKey: wyreAccount
      },
      operation: {
        type: 'onramp',
        /*
        The following hard coded address is to simplify the sign up process
        It is never used. When the plugin uses the widget in the future
        a new address the user chooses is added for the destination based on their
        wallet choice. This use of the widget is solely to do onboarding KYC
        and an address is needed or their is a screen to type out one by hand.
        This will be removed once Wyre finishes refactoring their widget
        */
        destCurrency: 'BTC',
        dest: `bitcoin:3BjzfELknjudFqciCTCjDntNr9WE2rtvHD`
      }
    })
    widget.open('complete', async function(e) {
      await window.edgeProvider.writeData({wyreAccountStatus: PENDING})
      await window.edgeProvider.writeData({wyreAccountId_id: e.accountId})
      await window.edgeProvider.writeData({wyrePaymentMethodId: e.paymentMethodId})
      await window.edgeProvider.writeData({wyrePaymentMethodId: e.wyreNetworkTxId})
      this.setState({
        accountStatus: PENDING
      })
    });
  }
/*
const widget = new window.Wyre.Widget({
        env: 'production',
        accountId: 'AC-FJN8L976EW4',
        auth: {
          type: 'secretKey',
          secretKey: wyreAccount
        },
        operation: {
          type: 'onramp',
          destCurrency: currencyCode,
          dest: `${addressPrefix}${wallet.receiveAddress.publicAddress}`
        }
      })
      widget.open()
      */
  gotoSell = () => {
    this.props.history.push(`/sellQuoteRequest`)
  }

  render () {
    const classes = this.props.classes
    if (!this.props.accountStatus) {
      return <div className={classes.containerSpinner}>
      <CircularProgress size={60} />
    </div>
    }
    if(this.props.accountStatus === APPROVED) {
      return <BuySellSceneConnector onSellClick={this.gotoSell}/>

    }
    if(this.props.accountStatus === PENDING) {
      return <PendingScreenComponent />
    }
    // NOT_STARTED || default
    return <SignUpComponent  onPress={this.initUser}/>
  }
}

const startStyles = (theme: Object) => ({
  container: {
    backgroundColor: '#FFF',
    padding: '20px',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  containerSpinner: {
    display: 'flex',
    flex: '1',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  h3: {
    color: theme.palette.primary.main,
    fontSize: '17pt',
    padding: '5px 0'
  },
  p: {
    fontSize: '14pt'
  },
  divider: {
    margin: '15px 0',
    height: '2px'
  },
  feeList: {
    listStyleType: '-'
  }
})


export default withStyles(startStyles)(StartScene)
