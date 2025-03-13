//
//  HomeInterfaceController.swift
//  helpchatWatch Extension
//
//  Created by Sam YazdanParast on 12/22/20.
//

import WatchKit
import Foundation


class HomeInterfaceController: WKInterfaceController {

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

    @IBAction func requestsButtonTapped() {
       self.pushController(withName: "screenListRequest", context: nil)
//      self.pushController(withName: "screenRequestList", context: nil)
        
    }
    
    
    @IBAction func settingButtonTapped() {
       self.pushController(withName: "screenSetting", context: nil)
    }
    
}
