//
//  InterfaceController.swift
//  helpchatWatch Extension
//
//  Created by Sam YazdanParast on 12/18/20.
//

import WatchKit
import Foundation


class InterfaceController: WKInterfaceController {

   
    
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        
        

      
//      let delayTime = DispatchTime.now() + 3.0
//
//     DispatchQueue.main.asyncAfter(deadline: delayTime, execute: {
//           self.pushController(withName: "loginScreen", context: nil)
//        })
        
      
        
    }
    
    override func willActivate() {
        // This method is called when watch view controller is about to be visible to user
        super.willActivate()
    }
    
    override func didDeactivate() {
        // This method is called when watch view controller is no longer visible
        super.didDeactivate()
    }

}
