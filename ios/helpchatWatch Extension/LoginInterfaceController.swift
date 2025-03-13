//
//  LoginInterfaceController.swift
//  helpchatWatch Extension
//
//  Created by Sam YazdanParast on 12/19/20.
//

import WatchKit
import Foundation


class LoginInterfaceController: WKInterfaceController {
    
    
    var username: String?
    var password: String?
  
  struct Session {
          static var access_token = ""
      }

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

    @IBAction func textFieldAction(_ value: NSString?) {
        
        username = value as String?
    }
    
    @IBAction func passwordFieldAction(_ value: NSString?) {
        password = value as String?
    }
    
    
    
    @IBAction func loginTabbed() {
          if(username == nil && password == nil){
                   let action = WKAlertAction(title: "ok", style: WKAlertActionStyle.default) { print("Ok")}
                      self.presentAlert(withTitle: "", message: "Please enter your username and password", preferredStyle: WKAlertControllerStyle.alert, actions:[action])
           }
            else if( username == nil ){
               let action = WKAlertAction(title: "ok", style: WKAlertActionStyle.default) { print("Ok")}
               self.presentAlert(withTitle: "", message: "Please enter your username", preferredStyle: WKAlertControllerStyle.alert, actions:[action])
            }
            else if( password == nil ){
               let action = WKAlertAction(title: "ok", style: WKAlertActionStyle.default) { print("Ok")}
               self.presentAlert(withTitle: "", message: "Please enter your password", preferredStyle: WKAlertControllerStyle.alert, actions:[action])
            }
          else {
            self.loginUser(username: username!,password: password!)
         }
    }

  
  
  
  
  
    // login function
  func loginUser(username: String, password: String) {
    print(username)
    print(password)
    let todosEndpoint: String = "https://helpchat.care/oauth/token"
    guard let todosURL = URL(string: todosEndpoint) else {
      print("Error: cannot create URL")
      return
    }
    var todosUrlRequest = URLRequest(url: todosURL)
    todosUrlRequest.httpMethod = "POST"
    todosUrlRequest.allHTTPHeaderFields = [
        "Content-Type": "application/json",
        "Accept": "application/json"
    ]
    let newTodo: [String: Any] = [
               "grant_type": "password",
               "client_id": "2",
               "client_secret":"wDoOfAU8uuZpTukHwvorDbYJRJSBA9rkZrtgC0HI",
               "username": "pflege2",
               "password": "123456",
               "scope": ""]
    let jsonTodo: Data
    do {
      jsonTodo = try JSONSerialization.data(withJSONObject: newTodo, options: [])
      todosUrlRequest.httpBody = jsonTodo
    } catch {
      print("Error: cannot create JSON from todo")
      return
    }

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

      // parse the result as JSON, since that's what the API provides
      do {
        guard let receivedTodo = try JSONSerialization.jsonObject(with: responseData,
          options: []) as? [String: Any] else {
            print("Could not get JSON from responseData as dictionary")
            return
        }
        
        if(receivedTodo["token_type"] == nil){
          let action = WKAlertAction(title: "ok", style: WKAlertActionStyle.default) { print("Ok")}
          self.presentAlert(withTitle: "", message: receivedTodo["message"] as? String, preferredStyle: WKAlertControllerStyle.alert, actions:[action])
        } else {
        
        print("INJAAAA",receivedTodo)
        Session.access_token = receivedTodo["access_token"] as! String
        self.startAttendance(accessToken: receivedTodo["access_token"] as! String)
        }
        
      } catch  {
        print("error parsing response from POST on /todos")
        return
      }
    }
    task.resume()
  }
  
  
//----  start  attendance ----
  func startAttendance(accessToken: String) {
       let todosEndpoint: String = "https://helpchat.care/api/attendance"
       guard let todosURL = URL(string: todosEndpoint) else {
         print("Error: cannot create URL")
         return
       }
       var todosUrlRequest = URLRequest(url: todosURL)
       todosUrlRequest.httpMethod = "POST"
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
//           self.logout(accessToken:accessToken)
          self.getInfoUser(accessToken:LoginInterfaceController.Session.access_token)
         } catch  {
           print("error parsing response from POST on /todos")
           return
         }
       }
       task.resume()
     }
  
  
  // ---- get info user ----
    func getInfoUser(accessToken: String) {
         let todosEndpoint: String = "https://helpchat.care/api/admin"
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
             print("teeee----eeeeeet",receivedTodo)
            //          self.pushController(withName: "screenSuccesfulLogin", context: nil)

  //           self.logout(accessToken:accessToken)
            self.pushController(withName: "screenSuccesfulLogin", context: nil)
           } catch  {
             print("error parsing response from POST on /todos")
             return
           }
         }
         task.resume()
       }
  
}
