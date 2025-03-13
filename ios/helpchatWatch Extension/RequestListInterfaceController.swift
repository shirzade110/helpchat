//
//  RequestListInterfaceController.swift
//  helpchatWatch Extension
//
//  Created by Sam YazdanParast on 1/2/21.
//

import WatchKit
import Foundation




class RequestListInterfaceController: WKInterfaceController {

    @IBOutlet var tabelRequest: WKInterfaceTable!
  
    @IBOutlet var goBackButtom: WKInterfaceButton!
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        // Configure interface objects here.
       getRequestList(accessToken:LoginInterfaceController.Session.access_token)
       
  }
  


  
    override func willActivate() {
        // This method is called when watch view controller is about to be visible to user
        super.willActivate()
        getRequestList(accessToken:LoginInterfaceController.Session.access_token)
    }

    override func didDeactivate() {
        // This method is called when watch view controller is no longer visible
         
        super.didDeactivate()
    }
  
  

    @IBAction func goBackTabbed() {
        self.pushController(withName: "screenHome", context: nil)
    }
    
    func getRequestList(accessToken: String){
     let url = URL(string: "https://helpchat.care/api/my_requests")
     guard let requestUrl = url else {
       fatalError()
       
     }
    
     var request = URLRequest(url: requestUrl)
     
     request.httpMethod = "GET"
     request.setValue("application/json", forHTTPHeaderField: "Accept")
     request.setValue("Bearer " + accessToken, forHTTPHeaderField: "Authorization")
     
     
     // Send HTTP Request
     let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
         
         // Check if Error took place
         if let error = error {
             print("Error took place \(error)")
             return
         }
         
         // Read HTTP Response Status code
         if let response = response as? HTTPURLResponse {
             print("Response HTTP Status code: \(response.statusCode)")
         }
       
         
        do {
            if let convertedJsonIntoDict = try JSONSerialization.jsonObject(with: data!, options: []) as? NSDictionary {
            let data = convertedJsonIntoDict["data"] as! NSArray
            self.tabelRequest.setNumberOfRows(data.count, withRowType: "Row")
                    for (index, value) in data.enumerated() {
                     guard let row = self.tabelRequest.rowController(at: index) as? itemRequest else { continue }
                     let id = (value as AnyObject).object(forKey:"id")
                      
//                      let imageView: UIImageView
//                      let bitmapSize = CGSize(width: 500, height: 500)
//                      imageView.sd_setImage(with: url, placeholderImage: nil, options: [], context: [.imageThumbnailPixelSize : bitmapSize])
                      
//                      let svgImage: UIImage // UIImage with vector image, or NSImage contains `NSSVGImageRep`
//                      if svgImage.sd_isVector { // This API available in SDWebImage 5.6.0
//                          let svgData = svgImage.sd_imageData(as: .SVG)
//                      }
          
                      
                     let title = (value as AnyObject).object(forKey:"entity_title")!
                     let status = (value as AnyObject).object(forKey: "status_id")
                     let date_value = (value as AnyObject).object(forKey:"created_at_human") as! String
                     let date = "vor" + date_value
                     let service = (value as AnyObject).object(forKey:"item_title")
                     let request_img =  (value as AnyObject).object(forKey:"watch_icon") as! String
                     let request_img_url = "https://helpchat.care" + request_img
                      
                    
                      
                      
                      
                      
                      
                      
                      
                      
                      
//                      if let imageURL = URL(string: request_img_url) {
//
//                          if let data = try? Data(contentsOf: imageURL) {
//                              print("ttt",data)
//                            row.imgRequest.setImage(UIImage(data: data))
//                          }
//                      }
                      
//                                 imageone.setImage(UIImage(data: data))
//
//                     let servic_title = (service_list[0] as AnyObject).object(forKey:"item_title")!
//                     let servic_priority = (service_list[0] as AnyObject).object(forKey:"priority")!
//                     let priority_title = (servic_priority as AnyObject).object(forKey:"title")!
                      
                      
                     let doneColor =  self.getUIColor(hex: "#3CDECC")
                     let shareColor = self.getUIColor(hex: "#1DD0FC")
                     let canceledColor = self.getUIColor(hex: "#1A41E3")
                      
                      if(status as! Int == 1) {
                         row.backRequest.setBackgroundColor(shareColor)
                      } else if (status as! Int == 2) {
                         row.backRequest.setBackgroundColor(doneColor)
                      }else if (status as! Int == 0) {
                         row.backRequest.setBackgroundColor(canceledColor)
                      }
                    
                     row.textLabelRequestTitle.setText(title as? String)
                     row.textLabelRequestServic.setText(service as? String)
                     row.textLabelRequestTime.setText(date as? String)
                      
                     row.imgRequest.setHeight(43)
                     row.imgRequest.setWidth(45)
                     
                      
//                      let url = URL(string: request_img_url)
//                      let data = try Data(contentsOf: url!)
//                      let placeholder = UIImage(data: data)
//                      row.imgRequest.setImage(placeholder)
                      
                      if let url = URL(string: request_img_url) {
                                     let data = try Data(contentsOf: url)
                                     if let placeholder = UIImage(data: data) {
                                         row.imgRequest.setImage(placeholder)
                        }
                      }
                      
                      
                      
                      
//                      let image = UIImage(data: data!, scale: 2.0)

//                     row.imgRequest.setImageData(request_img_url Data)
//                      print(request_img_url)
//                      row.imgRequest.setImage(UIImage(contentsOfFile: request_img_url))
                      
                      row.setId(id: id as! Int )
                     
                   
//
                     
                      }
                   
                       
                   }
        } catch let error as NSError {
                   print(error.localizedDescription)
         }
         
     }
     task.resume()
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
  }
    
  
  

}




