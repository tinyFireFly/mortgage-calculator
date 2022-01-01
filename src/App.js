import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ChakraProvider, Flex, HStack, Spacer, Button, Text, Heading} from '@chakra-ui/react'
import SliderComponent from './components/SliderComponent';
import TextInputComponent from './components/TextInputComponent';
import CurrencyDisplayComponent from './components/CurrencyDisplayComponent';
import React from 'react';

function App() {

  const [purchasePrice, setpurchasePrice] = React.useState(0);
  const [downPayment, setDownPayment] = React.useState(0);
  const [repaymentTime, setRepaymentTime] = React.useState(0);
  const [interestRate, setInterestRate] = React.useState(0);
  const [loanAmount, setLoanAmount] = React.useState(0);
  const [prMonth, setPrMonth] = React.useState(0);
  const [mortgageQuote, setMortgageQuote] = React.useState(0);


  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  })

  const calculateMortgageQuote = () => {
    var numPayments = (repaymentTime * 12)
    var principalAmount = (purchasePrice - downPayment)
    setLoanAmount(principalAmount)
    return (principalAmount * ( ((interestRate*(1 + interestRate))^numPayments) / ((((1 + interestRate))^numPayments) - 1 )) );
  }

  return (
    <ChakraProvider> 
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100vh"
        bg='#f5f3fb'
      >
        <Flex
          bgColor="purple.50"
          borderRadius={6}
          borderWidth={10}
          borderColor="white"
          flexDirection="column"
          padding={10}
          mt={10}
        >
          <Heading as="h2" size="lg">Mortgage Calculator</Heading>
                <Flex
                justifyContent="center"
                alignItems="flex-start"
                flexDirection="row"
                maxWidth='1400px'
                flexWrap="wrap"
                pb={8}
                
              >
                <SliderComponent width={'400px'} Placeholder={"Purchase Price"} stateValue={formatter.format(purchasePrice)} onChangeFunction={(val) => {setpurchasePrice(val)}} />
                <SliderComponent width={'400px'} Placeholder={"Down Payment"} stateValue={formatter.format(downPayment)} onChangeFunction={(val) => {setDownPayment(val)}} />
                <SliderComponent width={'400px'} Placeholder={"Repayment Time"} stateValue={(repaymentTime == 0) ? `${repaymentTime}` : `${repaymentTime} years`} maxValue={25} onChangeFunction={(val) => {setRepaymentTime(val)}} />
                <SliderComponent width={'400px'} Placeholder={"Interest Rate"} stateValue={`${interestRate}%`} maxValue={100} onChangeFunction={(val) => {setInterestRate(val)}} />
                {/* Okay these two components below will take text input and convert it to a numerical value */}
                <CurrencyDisplayComponent placeholderText={'Loan amount:'} textValue={formatter.format(loanAmount)} />
                <CurrencyDisplayComponent placeholderText={'Estimated pr month:'} textValue={formatter.format(mortgageQuote)} />
                
              </Flex>
              <Button mt={10} padding={10} maxWidth='400px'colorScheme="purple" onClick={(e) => {
                setMortgageQuote(calculateMortgageQuote)
                console.log(calculateMortgageQuote())
              
              }}>
                
                Get a Mortgage Quote</Button>
        </Flex>
        
        
      </Flex>
    </ChakraProvider>
  );
}

export default App;
