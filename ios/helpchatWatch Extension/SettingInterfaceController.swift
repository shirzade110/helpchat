//
//  SettingInterfaceController.swift
//  helpchatWatch Extension
//
//  Created by Sam YazdanParast on 12/19/20.
//

import WatchKit
import Foundation


class SettingInterfaceController: WKInterfaceController {

    @IBOutlet var settingTable: WKInterfaceTable!
    
    
    override func awake(withContext context: Any?) {
        super.awake(withContext: context)
        renderSettingList()

    }

    override func willActivate() {
        // This method is called when watch view controller is about to be visible to user
        super.willActivate()
    }

    override func didDeactivate() {
        // This method is called when watch view controller is no longer visible
        super.didDeactivate()
    }
    
    
    
    
   func renderSettingList(){
    let settingData: [String] = ["Ton","Vibration","Benachrichtigung"]
          
        
    self.settingTable.setNumberOfRows(settingData.count, withRowType: "Row")
    
        for (index, value) in settingData.enumerated() {
             guard let row = self.settingTable.rowController(at: index) as? ItemSetting else { continue }
          
             row.labelSetting.setText(value)
          
        }
    
    }
    
    
    @IBAction func gobackTabbed() {
      self.pushController(withName: "screenHome", context: nil)
    }
    
    
    @IBAction func logoutTabbed() {
        self.pushController(withName: "screenLogout", context: nil)
    }
}



