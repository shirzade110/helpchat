//
//  logoutInterfaceController.swift
//  helpchatWatch Extension
//
//  Created by Sam YazdanParast on 4/15/21.
//

import WatchKit
import Foundation


class logoutInterfaceController: WKInterfaceController {

    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        // Configure interface objects here.
    }

    override func willActivate() {
        // This method is called when watch view controller is about to be visible to user
        super.willActivate()
    }

    override func didDeactivate() {
        // This method is called when watch view controller is no longer visible
        super.didDeactivate()
    }
    
    
    
    
    @IBAction func goBackTabbed() {
        self.pushController(withName: "screenSetting", context: nil)
    }
    
    @IBAction func logoutTabbed() {
      endAttendance(accessToken:LoginInterfaceController.Session.access_token)
    }
  
  
  //----  end of attendance ----
  func endAttendance(accessToken: String) {
       let todosEndpoint: String = "https://helpchat.care/api/attendance"
       guard let todosURL = URL(string: todosEndpoint) else {
         print("Error: cannot create URL")
         return
       }
       var todosUrlRequest = URLRequest(url: todosURL)
       todosUrlRequest.httpMethod = "PUT"
       todosUrlRequest.allHTTPHeaderFields = [
           "Content-Type": "application/json",
           "Accept": "application/json",
           "Authorization" :"Bearer " + accessToken
       ]
       let session = URLSession.shared
       let task = session.dataTask(with: todosUrlRequest) {
         (data, response, error) in
         guard error == nil else {
           print(error!)
           return
         }
         guard let responseData = data else {
           print("Error: did not receive data")
           return
         }
         do {
           guard let receivedTodo = try JSONSerialization.jsonObject(with: responseData,
             options: []) as? [String: Any] else {
               print("Could not get JSON from responseData as dictionary")
               return
           }
           self.logout(accessToken:accessToken)
         } catch  {
           print("error parsing response from POST on /todos")
           return
         }
       }
       task.resume()
     }
  
  
//  ----   logout ----
   func logout(accessToken: String) {
         let todosEndpoint: String = "https://helpchat.care/api/logout"
         guard let todosURL = URL(string: todosEndpoint) else {
           print("Error: cannot create URL")
           return
         }
         var todosUrlRequest = URLRequest(url: todosURL)
         todosUrlRequest.httpMethod = "GET"
         todosUrlRequest.allHTTPHeaderFields = [
             "Content-Type": "application/json",
             "Accept": "application/json",
             "Authorization" :"Bearer " + accessToken
         ]
     
         let session = URLSession.shared
         let task = session.dataTask(with: todosUrlRequest) {
           (data, response, error) in
           guard error == nil else {
             print(error!)
             return
           }
           guard let responseData = data else {
             print("Error: did not receive data")
             return
           }
           do {
             guard let receivedTodo = try JSONSerialization.jsonObject(with: responseData,
               options: []) as? [String: Any] else {
                 print("Could not get JSON from responseData as dictionary")
                 return
             }
             let result = (receivedTodo["data"] as AnyObject).object(forKey:"result")!
             
            if(result as! Int == 1) {
                  self.pushController(withName: "loginScreen", context: nil)
              }
              
           } catch  {
             print("error parsing response from POST on /todos")
             return
           }
         }
         task.resume()
       }
}
