//
//  Alert.swift
//  helpchatWatch Extension
//
//  Created by Sam YazdanParast on 4/1/21.
//

import WatchKit
import Foundation


class alert {
    func msg(message: String, title: String = "")
    {
        let alertView = UIAlertController(title: title, message: message, preferredStyle: .Alert)

        alertView.addAction(UIAlertAction(title: "Done", style: .Default, handler: nil))

        UIApplication.sharedApplication().keyWindow?.rootViewController?.presentViewController(alertView, animated: true, completion: nil)
    }
}
