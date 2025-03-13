//
//  itemRequest.swift
//  helpchatWatch Extension
//
//  Created by Sam YazdanParast on 3/29/21.
//

import WatchKit
import Foundation


class itemRequest: NSObject {
  
  
    var requestId: Int = 0
    var statusId : Int = 0
    
  

    
    @IBOutlet var imgStatus: WKInterfaceImage!
    
    @IBOutlet var backRequest: WKInterfaceGroup!
    
    @IBOutlet var labelMessage: WKInterfaceLabel!
   
    @IBOutlet var backConfirm: WKInterfaceGroup!
    
    @IBOutlet var imgRequest: WKInterfaceImage!
    
    @IBOutlet var textLabelRequestTitle: WKInterfaceLabel!


    @IBOutlet var textLabelRequestServic: WKInterfaceLabel!


    @IBOutlet var textLabelRequestTime: WKInterfaceLabel!
    
    

    @IBAction func handelSwipeRight(swipeGestureRecognize:WKSwipeGestureRecognizer ) {
        
        print("awipping right.....")
        WKInterfaceDevice.current().play(.click)
    }
    
   
    
    @IBAction func handelSwipeLeft(swipeGestureRecognize:WKSwipeGestureRecognizer) {
        
        print("awipping left.....")
        WKInterfaceDevice.current().play(.click)
    }
    
 
    
//    @IBAction func swipAction(_ sender: Any) {
//
//
//        if ((sender as AnyObject).direction == .left) {
//                print("Swipe Left")
//
//        }
//        if ((sender as AnyObject).direction == .right) {
//                print("Swipe right")
//
//        }
//    }
    
    
    
    
    
    @IBAction func btnShare() {
      let shareColorConfirm = self.getUIColor(hex: "#F42D98")
      backConfirm.setBackgroundColor(shareColorConfirm)
      imgStatus.setImageNamed("warning")
      labelMessage.setText("Boost Request")
      backConfirm.setHidden(false)
      statusId = 1
    }
    
    @IBAction func btnDone() {
       let doneColorConfirm = self.getUIColor(hex: "#99F089")
       backConfirm.setBackgroundColor(doneColorConfirm)
       imgStatus.setImageNamed("tik")
       labelMessage.setText("Request Done")
       backConfirm.setHidden(false)
       statusId = 2
    }
    
    
    
   
    @IBAction func confirmTabbed() {
         self.changeStatus(accessToken:LoginInterfaceController.Session.access_token,requestId:self.requestId,status:statusId)
    }
    
    
  
    func setId(id: Int){
        self.requestId = id
    }
  
  
  
  
  func changeStatus(accessToken: String,requestId : Int,status:Int) {
    

    let doneColor =  self.getUIColor(hex: "#3CDECC")
    let shareColor = self.getUIColor(hex: "#1DD0FC")
    
      let todosEndpoint: String = "https://helpchat.care/api/request"
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
      let newTodo: [String: Any] = [
                  "request_item_id": requestId,
                  "status": status]
      let jsonTodo: Data
      do {
        jsonTodo = try JSONSerialization.data(withJSONObject: newTodo)
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
        do {
          guard let receivedTodo = try JSONSerialization.jsonObject(with: responseData,
            options: []) as? [String: Any] else {
              print("Could not get JSON from responseData as dictionary")
              return
          }
          let result = (receivedTodo["data"] as AnyObject).object(forKey:"result")!
          print("RESULTTTT",result)
          
          self.backConfirm.setHidden(true)

          if(status == 1) {
            self.backRequest.setBackgroundColor(shareColor)
          } else if (status == 2) {
            self.backRequest.setBackgroundColor(doneColor)
          }
          
          
  
          
        } catch  {
          print("error parsing response from POST on /todos")
          return
        }
      }
      task.resume()
    }
  
  
  
  func refreshPage(){
//     self.pushController(withName: "screenHome", context: nil)
//    let requestListInterfaceController = RequestListInterfaceController()
//    requestListInterfaceController.refreshPage()
  }
  
  func getUIColor(hex: String, alpha: Double = 1.0) -> UIColor? {
      var cleanString = hex.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()

      if (cleanString.hasPrefix("#")) {
          cleanString.remove(at: cleanString.startIndex)
      }

      if ((cleanString.count) != 6) {
          return nil
      }

      var rgbValue: UInt32 = 0
      Scanner(string: cleanString).scanHexInt32(&rgbValue)

      return UIColor(
          red: CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0,
          green: CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0,
          blue: CGFloat(rgbValue & 0x0000FF) / 255.0,
          alpha: CGFloat(1.0)
      )
  }}


	



