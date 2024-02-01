import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const TermsAndConditions = () => {
    const navigation = useNavigation()

    const handleAcceptTerms = () => {
        // Handle the action when the user accepts the terms and conditions
        // For example, navigate to the next screen
        navigation.navigate('SignUp');
      };
  return (
    <ScrollView className="p-4 mt-6">
      <Text className="text-xl font-bold mb-2">Nephench – User Agreement</Text>
      <Text className="text-base mb-4">
        * Nephench Company is an online platform bridging the gap between
        service users (customers) and service providers (technicians). * For
        your convenience, make sure you carefully read all the guidelines given
        on this terms and conditions page before using Nephench Company. * In
        these terms and conditions (which are referred to in this document as
        "these terms"), "Customer" means the customer for whom the Works are to
        be carried out by Nephench Company's technicians .
      </Text>

      <Text className="text-lg font-bold mb-2">Scope of Nephench Services</Text>
      <Text className="text-base mb-4">
        * Company offers the Nephench Company Platform to support technicians in
        finding work and help customers avail their services. * Company assigns
        the verified technicians (according to their availability) for the
        selected service and shares customer's details with them. * Customer can
        change order details or cancel the order if it has not yet been accepted
        and still has 'received status.' * After the task has been assigned to a
        technician, his details will be shared with the customer through call
        and Nephench Company's App. * The customer can either pay in cash or
        through online means, that includes Bank transfer, Esewa, and Fonepay. *
        If the customer transfers the payable to the technician through online
        means, the technician will transfer Company's service charges the same
        day. * In the event of an extension of any service, both technician and
        customer should inform Nephench Company, or else company will not take
        responsibility for any mishap, damage, or repair. * Our verified
        technicians will adhere to the customers' specific needs in a manner
        specified in the technician-company contract. * Both technician and
        customer will provide their reviews about the service after its
        completion.
      </Text>

      <Text className="text-lg font-bold mb-2">
        Role & Obligations of Nephench Company
      </Text>
      <Text className="text-base mb-4">
        * Company connects customers with technicians for offering convenience
        to the first and employment opportunities to the latter. * The age of a
        technician registering with us should be more than 18 years. * The user
        of our service can either be a company or an individual. * Account
        creation and booking of orders on Company are completely free of cost. *
        At its will, Company may deny allowing any individual the creation or
        registration of an account with Company or suspend or cancel any
        existing account. * Company takes no responsibility for any aspect of
        the technician and customer interaction (performance, delivery,
        description of Services, etc.) * We do legal background checks of the
        technicians during the registration process but do not take any
        responsibility for wrongdoing by them at the site. In case of any theft
        or damage (intentional or unintentional), we can only provide you with
        information about the technician. We would not be able to support you
        any further if you want to go for legal proceedings. * Company has no
        responsibility to any customer to support or involve itself in
        disagreement among Company’s platform users expect for enhancing user
        experience.
      </Text>

      <Text className="text-lg font-bold mb-2">User Obligations</Text>
      <Text className="text-base mb-4">
        * By agreeing to these conditions, you will all time: * obey this
        Contract and all applicable regulations and laws. * post the only
        correct information on the Nephench Company Platform. * quickly and
        competently perform duties to the other user under the Contract. *
        guarantee that You are mindful of all regulations that apply to You as a
        technician or a customer. * Agree that any content (provided by the
        company, a customer, or Technician) on the Nephench Company Platform may
        not be utilized for other business purposes or on third party sites
        without asking permission from Nephench Company’s. * You must not use
        the Nephench Company Platform for any immoral or illegal or activity. *
        You must maintain your Nephench Company account by yourself and not sell
        or transfer your Account, or allow others to use it. You must also know
        that selling or transferring your Account's contents to a third part is
        also prohibited. * You agree that any information posted on the Nephench
        Company Platform should not be actually or potentially damaging to
        Nephench Company or any other individual. Damages include, but are not
        limited to, financial loss that may or will be suffered by Nephench
        Company. * Technicians must deliver Services to the customer in
        accordance with the Contract, except if the Services are forbidden by
        law. * Technician must not charge a customer any additional fees on top
        of the advertised fee. Although, the parties to a Contract may decide to
        adjust the Agreed Price through the Nephench Company Platform. * It is
        suggested not to demand payments separate from the Nephench Company
        Platform from the customer. This is suggested for the safety of your
        payment.
      </Text>


      <TouchableOpacity className="
          bg-yellow-400 py-2 px-4 rounded-lg m-10
          items-center justify-center"
        onPress={handleAcceptTerms}
      >
        <Text className="text-base text-gray-700 font-bold">
          Accept Terms & Conditions
        </Text>
      </TouchableOpacity>

      
      {/* Add more sections using Text components */}
    </ScrollView>
  )
}

export default TermsAndConditions
